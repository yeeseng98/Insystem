import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TaskConfigService {

  private API: string = 'http://127.0.0.1:5000/';

  constructor(private http: Http) { }

  // get specific intake tasks
  public getIntakeTasks(intakeId: string) {
    const params = {
      intakeId: intakeId
    };
    return this.http.get(this.API + 'intakeTasks', { search: params });
  }

}
