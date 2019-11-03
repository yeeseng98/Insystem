import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StudentConfigService {

  private API: string = 'http://127.0.0.1:5000/';

  constructor(private http: Http, public alertCtrl: AlertController) { }

  public confirmDeclaration(studentId: string, studentName: string, intake: string) {
    const params = {
      studentId: studentId,
      studentName: studentName,
      intake: intake
    };

    this.http.post(this.API + 'confirmDeclaration', params).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('The declaration is signed successfully!');
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
