import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestConfigService } from 'src/app/services/requestConfig/request-config.service';
import { AlertController } from '@ionic/angular';
import { WsApiService } from 'src/app/services/wsApiService/ws-api.service';
import { Observable } from 'rxjs';
import { StudentProfile } from 'src/app/interfaces/student-profile';

@Component({
  selector: 'app-meeting-confirmation-request',
  templateUrl: './meeting-confirmation-request.page.html',
  styleUrls: ['./meeting-confirmation-request.page.scss'],
})
export class MeetingConfirmationRequestPage implements OnInit {

  profile$: Observable<StudentProfile>;

  public mentorName: string;
  public studentId;
  public form: FormGroup;
  public isPending = false;
  public requests: any[] = [];
  public open = false;

  constructor(private _FB: FormBuilder, private requestConfigService: RequestConfigService,
    public alertCtrl: AlertController, private ws: WsApiService) {

    this.form = this._FB.group({
      content: ['', Validators.required]
    });

    this.profile$ = this.ws.get<StudentProfile>('/student/profile');
    this.profile$.subscribe(std => {
      this.mentorName = std.MENTOR_NAME;
      this.studentId = std.STUDENT_NUMBER;

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
    });
  }

  ngOnInit() {
  }

  receive(val: any, isPending: string) {
    if (!isPending) {
      this.requestConfigService.sendMeetRequest(val.content, this.mentorName, this.studentId);
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
