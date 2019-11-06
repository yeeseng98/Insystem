import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RequestConfigService {

  private API: string = 'http://127.0.0.1:5000/';

  constructor(private http: Http, public alertCtrl: AlertController) { }

  // sends a discussion content request
  public sendMeetRequest(content: string, mentorId: string, studentId: string) {
    const meetInfo = {
      mentorId: mentorId,
      studentId: studentId,
      content: content
    };
    this.http.post(this.API + 'newMeeting', meetInfo).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('The request is sent to your supervisor!');
      } else {
        this.generateAlert('Some error has occured, please try again later.');
      }
    });
  }

  // checks for pending discussion content requests
  public checkMeetRequest(studentId: string) {
    const params = {
      studentId: studentId,
    };

    return this.http.get(this.API + 'checkRequest', { search: params });
  }

  // gets a list of discussion content requests based on mentor full name
  public getRequests(mentorId: string) {
    const params = {
      mentorId: mentorId,
    };

    return this.http.get(this.API + 'getRequests', { search: params });
  }

  // approves a discussion content request
  public approveRequest(val: any, mentorId: any) {
    const approveInfo = {
      studentId: val['studentId'],
      mentorId: mentorId,
    };
    this.http.post(this.API + 'approveRequest', approveInfo).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('The request is approved successfully!');
      } else {
        this.generateAlert('Some error has occured, please try again later.');
      }
    });
  }

  // rejects a discussion content request
  public rejectRequest(val: any, mentorId: any, rej: any) {
    const rejectInfo = {
      studentId: val['studentId'],
      mentorId: mentorId,
      rej: rej
    };
    this.http.post(this.API + 'rejectRequest', rejectInfo).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('The request is rejected successfully!');
      } else {
        this.generateAlert('Some error has occured, please try again later.');
      }
    });
  }

  // approves a discussion content request
  public approveCompanyApplication(val: any, mentorId: any, companyId: any) {
    const approveInfo = {
      studentId: val['studentId'],
      mentorId: mentorId,
      companyId: companyId
    };
    this.http.post(this.API + 'approveCompanyApplication', approveInfo).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('The request is approved successfully!');
      } else {
        this.generateAlert('Some error has occured, please try again later.');
      }
    });
  }

  // rejects a discussion content request
  public rejectCompanyApplication(val: any, mentorId: any, companyId: any, rej: any) {
    const rejectInfo = {
      studentId: val['studentId'],
      mentorId: mentorId,
      companyId: companyId,
      rej: rej
    };
    this.http.post(this.API + 'rejectCompanyApplication', rejectInfo).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('The request is rejected successfully!');
      } else {
        this.generateAlert('Some error has occured, please try again later.');
      }
    });
  }

  // gets a list of company application requests based on mentor full name
  public getComRequests(mentorId: string) {
    const params = {
      mentorId: mentorId,
    };

    return this.http.get(this.API + 'getCompanyRequests', { search: params });
  }

  generateAlert(response) {
    const alert = this.alertCtrl.create({
      message: response,
      buttons: ['Dismiss']
    }).then(alert => alert.present());

    return alert;
  }
}
