import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IntakeConfigService {

  intakesUrl = 'https://s3-ap-southeast-1.amazonaws.com/open-ws/intake_listing';

  constructor(public http: HttpClient) { }

  getIntakeList() {
    return this.http.get(this.intakesUrl);
  }
}
