import { Component, OnInit } from '@angular/core';
import { RequestConfigService } from 'src/app/services/requestConfig/request-config.service';
import { AlertController, MenuController } from '@ionic/angular';
import { WsApiService } from 'src/app/services/wsApiService/ws-api.service';
import { Observable } from 'rxjs';
import { StaffProfile } from 'src/app/interfaces/staff-profile';

@Component({
  selector: 'app-company-approval',
  templateUrl: './company-approval.page.html',
  styleUrls: ['./company-approval.page.scss'],
})
export class CompanyApprovalPage implements OnInit {

  staffProfile$: Observable<StaffProfile[]>;

  public requests: any[] = [];
  public mentorId;

  constructor(private requestConfigService: RequestConfigService, public alertCtrl: AlertController,
              private ws: WsApiService) {

    this.staffProfile$ = this.ws.get<StaffProfile[]>('/staff/profile');

    this.staffProfile$.subscribe(mtr => {

      this.mentorId = mtr[0].FULLNAME;

      this.requestConfigService.getComRequests(this.mentorId).subscribe(res => {

        // const json_data = JSON.parse(JSON.stringify(res));

        // console.log(json_data);
        // json_data.forEach(element => {
        //   const req = {
        //     studentName: element.studentName,
        //     studentId: element.studentID,
        //     content: element.content
        //   };
        //   this.requests.push(req);
        // });

        // this.requests[0].open = true;
      });
    });
  }

  ngOnInit() {
  }

  approveReq(val: any) {
    this.requestConfigService.approveCompanyApplication(val, this.mentorId, 'companyID');
    let index = this.requests.indexOf(val);
    this.requests.splice(index, 1);
  }

  rejectReq(val: any) {
    let alert = this.alertCtrl.create({
      subHeader: 'Reason for rejection:',
      inputs: [
        {
          name: 'rejection',
          placeholder: 'reason'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.requestConfigService.rejectCompanyApplication(val, this.mentorId, data.rejection, 'companyID');
            let index = this.requests.indexOf(val);
            this.requests.splice(index, 1);
          }
        }
      ]
    }).then(alert => alert.present());
  }

  toggleSelection(i) {
    this.requests[i].open = !this.requests[i].open;
  }
}
