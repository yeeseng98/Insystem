import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RequestConfigService {

  private API: string = 'http://127.0.0.1:5000/';

  constructor(private http: Http) { }

  public sendMeetRequest(content: string, mentorId: string, studentId: string) {
    const meetInfo = {
      mentorId: mentorId,
      studentId: studentId,
      content: content
    };
    console.log(meetInfo);
    this.http.post(this.API + 'newMeeting', meetInfo).subscribe(response => console.log(response));
  }

  public checkMeetRequest(studentId: string) {
    const params = {
      studentId: studentId,
    };

    return this.http.get(this.API + 'checkRequest', { search: params });
  }

  public getRequests(mentorId: string) {
    const params = {
      mentorId: mentorId,
    };

    return this.http.get(this.API + 'getRequests', { search: params });
  }

  public approveRequest(val: any, mentorId: any){
    const approveInfo = {
      studentId: val['studentId'],
      mentorId: mentorId,
    };
    this.http.post(this.API + 'approveRequest', approveInfo).subscribe(response => console.log(response));
  }

  public rejectRequest(val: any, mentorId: any, rej: any) {
    const rejectInfo = {
      studentId: val['studentId'],
      mentorId: mentorId,
      rej: rej
    };
    this.http.post(this.API + 'rejectRequest', rejectInfo).subscribe(response => console.log(response));
  }
}
