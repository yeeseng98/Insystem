import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {
  private API: string = 'http://127.0.0.1:5000/';
  //private fString: string = 'https://dev.appseed.io.s3.amazonaws.com/mobile-apps/demo-angular-dynamic-forms/';

  constructor(private http: Http) { }

  public getFormConfig(url) {
    return this.http.get(this.API + url);
  }

  public submitNewForm(val: any) {
    const formName = val['fname'];
    const formField = val['cfields'];
    const form = {
      fname: formName
    }
    this.http.post(this.API + 'newForm', form).subscribe(response => console.log(response));
    // tslint:disable-next-line: forin
    for (let i in formField) {
      let option = new Array();
      if (formField[i].options !== '') {
        option = formField[i].options.split(',').map(function(item) {
          return item.trim();
        });
      }
      const field = {
        fname: formName,
        name: formField[i].name,
        type: formField[i].type,
        required: formField[i].isRequired,
        display: formField[i].display,
        selected: formField[i].selected,
        title: formField[i].title,
        options: option
      };
      this.http.post(this.API + 'writeFields', field).subscribe(response => console.log(response));
    }
  }
}
