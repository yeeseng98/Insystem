import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskConfigService {

  private API: string = 'http://127.0.0.1:5000/';

  private locked = new BehaviorSubject(true);
  isLocked = this.locked.asObservable();

  constructor(private http: Http) { }

  // get specific intake tasks
  public getIntakeTasks(intakeId: string) {
    const params = {
      intakeId: intakeId
    };
    return this.http.get(this.API + 'intakeTasks', { search: params });
  }

  // get start end dates of phases in an intake
  public getIntakePhaseDates(intakeId: string) {
    const params = {
      intakeId: intakeId
    };

    return this.http.get(this.API + 'intakeDates', { search: params });
  }

  // sends task info for a file task
  public getFileTask(taskId: string) {
    const params = {
      taskId: taskId
    };

    return this.http.get(this.API + 'getFileTask', { search: params });
  }
  changeLock(bool: boolean) {
    this.locked.next(bool);
  }
}
