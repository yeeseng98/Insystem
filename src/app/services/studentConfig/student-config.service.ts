import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentConfigService {

  private API: string = 'http://127.0.0.1:5000/';

  constructor(private http: Http, public alertCtrl: AlertController, private router: Router) { }

  // student sends a declaration request
  public confirmDeclaration(studentId: string, studentName: string, intake: string) {
    const params = {
      studentId: studentId,
      studentName: studentName,
      intake: intake
    };

    this.http.post(this.API + 'confirmDeclaration', params).subscribe(response => {
      if (response.status === 200) {
        this.generateAlert('The declaration is signed successfully!');
        this.router.navigate(['int-declaration']);
      } else {
        this.generateAlert('Some error has occured, please try again later.');
      }
    });
  }

  /* check if the student has already declared internship
   * true -> redirect to task view page.
   * false -> redirect to internship declaration page.
   */
  checkDeclaration(studentId: string) {
    const params = {
      studentId: studentId,
    };

    return this.http.get(this.API + 'checkStudentExist', { search: params });
  }

  // gets internship profile of a specific student
  getStudent(studentId: string) {
    const params = {
      studentId: studentId,
    };

    return this.http.get(this.API + 'getStudent', { search: params });
  }

  // extend internship end date of a specific student
  extendInternship(studentId: string, endDate: string) {
    const params = {
      studentId: studentId,
      endDate: endDate
    };

    return this.http.get(this.API + 'getStudent', { search: params });
  }

  generateAlert(response) {
    const alert = this.alertCtrl.create({
      message: response,
      buttons: ['Dismiss']
    }).then(alert => alert.present());

    return alert;
  }
}
