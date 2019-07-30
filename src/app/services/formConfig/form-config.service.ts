import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {
  private fString: string = 'http://127.0.0.1:5000/';

  constructor(private http: Http) { }

  public getFormConfig(filename) {
    return this.http.get(this.fString + filename);
  }
}
