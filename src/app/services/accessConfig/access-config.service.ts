import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AccessConfigService {
  private API: string = 'http://127.0.0.1:5000/';

  constructor(private http: Http, public alertCtrl: AlertController) { }

  // This method retrieves information for user accessibility.
  public getUserAccess(role: string) {

    const params = {
      userRole: role
    };

    return this.http.get(this.API + 'getUserAccess', { search: params });
  }

  // This method retrieves pages that have modifiable accesibility.
  public getModPages() {
    return this.http.get(this.API + 'getModPages');
  }

  // Triggered when the superuser changes a page accessibility.
  public changeAuthority(value: string, pageId: string) {
    const params = {
      value: value,
      pageId: pageId
    };

    this.http.post(this.API + 'changeAccess', params).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('The change is updated successfully!');
      } else {
        this.generateAlert('Some error has occured, please try again later.');
      }
    });
  }

  generateAlert(response) {
    const alert = this.alertCtrl.create({
      message: response,
      buttons: ['Dismiss']
    }).then(alert => alert.present());

    return alert;
  }
}
