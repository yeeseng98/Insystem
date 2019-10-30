import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestConfigService } from 'src/app/services/requestConfig/request-config.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-meeting-confirmation-request',
  templateUrl: './meeting-confirmation-request.page.html',
  styleUrls: ['./meeting-confirmation-request.page.scss'],
})
export class MeetingConfirmationRequestPage implements OnInit {

  public mentorName: string;
  public mentorId = 'SE1928';
  public studentId = 'TP041800';
  public form: FormGroup;
  public isPending = false;
  public requests: any[] = [];
  public open = false;

  constructor(private _FB: FormBuilder, private requestConfigService: RequestConfigService, public alertCtrl: AlertController) {
    this.mentorName = 'Ms. Mary Ting';

    this.form = this._FB.group({
      content: ['', Validators.required]
    });

    this.requestConfigService.checkMeetRequest(this.studentId).map(res => res.json())
      .subscribe(response => {
        const json_data = JSON.parse(JSON.stringify(response));

        if (json_data.length > 0) {
          json_data.forEach(element => {
            if (element.isApproved === 'PEND') {
              const request = {
                status: 'PENDING',
                content: element.content,
                date: element.dateCreated
              };

              this.requests.push(request);
            } else if (element.isApproved === 'APP') {
              const request = {
                status: 'APPROVED',
                content: element.content,
                date: element.dateCreated
              };

              this.requests.push(request);
            } else if (element.isApproved === 'REJ') {
              const request = {
                status: 'REJECTED',
                content: element.content,
                date: element.dateCreated,
                rej: element.rejectComment
              };

              this.requests.push(request);
            } else {
              const request = {
                status: 'UNKNOWN',
                date: element.dateCreated,
                content: element.content
              };

              this.requests.push(request);
            }
            if (element.isApproved === 'PEND') {
              this.isPending = true;
            }
          });
        }
      });
  }

  ngOnInit() {
  }

  receive(val: any, isPending: string) {
    if (!isPending) {
      this.requestConfigService.sendMeetRequest(val.content, this.mentorId, this.studentId);
      this.isPending = true;
    } else {
      const alert = this.alertCtrl.create({
        message: 'You are not allowed to send another request if there is a pending request.',
        subHeader: 'Error!',
        buttons: ['Dismiss']
      }).then(alert => alert.present());
    }
  }

  toggleSelection(i) {
    this.open = !this.open;
  }
}
