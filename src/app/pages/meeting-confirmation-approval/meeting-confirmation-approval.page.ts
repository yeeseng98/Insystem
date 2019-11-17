import { Component, OnInit } from '@angular/core';
import { RequestConfigService } from 'src/app/services/requestConfig/request-config.service';
import { AlertController, MenuController } from '@ionic/angular';
import { WsApiService } from 'src/app/services/wsApiService/ws-api.service';
import { StaffProfile } from 'src/app/interfaces/staff-profile';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meeting-confirmation-approval',
  templateUrl: './meeting-confirmation-approval.page.html',
  styleUrls: ['./meeting-confirmation-approval.page.scss'],
})
export class MeetingConfirmationApprovalPage implements OnInit {

  staffProfile$: Observable<StaffProfile[]>;

  public requests: any[] = [];
  public mentorId;

  constructor(private requestConfigService: RequestConfigService, public alertCtrl: AlertController, 
              private ws: WsApiService, private menuCtrl: MenuController) {
    menuCtrl.enable(true);

    this.staffProfile$ = this.ws.get<StaffProfile[]>('/staff/profile');

    this.staffProfile$.subscribe(mtr => {

      // this.mentorId = mtr[0].FULLNAME;

      // remove when user test
      this.mentorId = 'MARY TING';
      // this.mentorId = 'SE1928';

      this.requestConfigService.getRequests(this.mentorId).map(res => res.json())
        .subscribe(response => {
          const json_data = JSON.parse(JSON.stringify(response));

          console.log(json_data);
          json_data.forEach(element => {
            const req = {
              studentName: element.studentName,
              studentId: element.studentID,
              content: element.content
            };
            this.requests.push(req);
          });

          this.requests[0].open = true;
        });
    });
  }

  ngOnInit() {
  }

  approveReq(val: any) {
    this.requestConfigService.approveRequest(val, this.mentorId);
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
            this.requestConfigService.rejectRequest(val, this.mentorId, data.rejection);
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
