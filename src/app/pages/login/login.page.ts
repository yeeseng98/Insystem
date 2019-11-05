import { Component, OnInit } from '@angular/core';
import { Events, Platform, ToastController, AlertController, NavController, MenuController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

import { throwError } from 'rxjs';
import { catchError, switchMap, tap, timeout } from 'rxjs/operators';

import { Role } from '../../interfaces/settings';
import { CasTicketService } from '../../services/cas-ticket.service';
import { WsApiService } from '../../services/wsApiService/ws-api.service';
import { Router } from '@angular/router';
import { StudentConfigService } from 'src/app/services/studentConfig/student-config.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  apkey: string;
  password: string;
  showPassword: boolean;

  // LOGIN BUTTON ANIMATIONS ITEMS
  userDidLogin = false;
  loginProcessLoading = false;
  userAuthenticated = false;
  userUnauthenticated = false;

  constructor(
    private cas: CasTicketService,
    private events: Events,
    private network: Network,
    private plt: Platform,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private ws: WsApiService,
    public alertCtrl: AlertController,
    private router: Router,
    private sConfig: StudentConfigService,
    private menuCtrl: MenuController,
    private settings: SettingsService
  ) { }

  ngOnInit() {
  }

  onLoginBtnClicked() {
    this.userDidLogin = true;
    this.loginProcessLoading = true;
    if (!this.apkey || !this.password) {
      this.loginProcessLoading = false;
      this.userDidLogin = false;
      this.showToastMessage('Please, fill up username and password');
    } else {
      if (this.plt.is('cordova') && this.network.type === 'none') {
        return this.showToastMessage('You are now offline.');
      }
      this.cas.getTGT(this.apkey, this.password).pipe(
        catchError(err => {
          // the error format may changed anytime, should be checked as string
          const errMsg = JSON.stringify(err);

          if (errMsg.includes('AccountPasswordMustChangeException')) {
            this.showConfirmationMessage();
            this.showToastMessage('Your password has expired!');
            return throwError('Your password has expired!');
          } else {
            this.showToastMessage('Invalid username or password');
            return throwError('Invalid Username or Password');
          }
        }),
        switchMap(tgt => this.cas.getST(this.cas.casUrl, tgt).pipe(
          catchError(e => (this.showToastMessage('Fail to get service ticket.'), throwError('Fail to get service ticket')))
        )),
        switchMap(st => this.cas.validate(st).pipe(
          catchError(e => (this.showToastMessage('You are not authorized to use APSpace'), throwError('unauthorized')))
        )),
        tap(role => this.cacheApi(role)),
        timeout(15000),
        tap(_ => this.events.publish('user:login')),
      ).subscribe(
        _ => { },
        _ => {
          this.loginProcessLoading = false;
          this.userUnauthenticated = true;
          setTimeout(() => {
            // Hide the error message after 2 seconds
            this.userUnauthenticated = false;
            this.userDidLogin = false;
          }, 2000);
        },
        () => {
          this.loginProcessLoading = false;
          this.userAuthenticated = true;
          setTimeout(() => {
            // Show the success message for 300 ms after completing the request
            this.checkAndRedirect();
          }, 300);
        }
      );
    }
  }

  showToastMessage(message: string) {
    this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
      animated: true,
      color: 'danger',
    }).then(toast => toast.present());
  }

  showConfirmationMessage() {
    this.alertCtrl.create({
      header: 'Your password has expired..',
      message: 'You are required to change your password to be able to login to the APSpace' +
        'and other applications. The following documentation provides the steps to do that.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Open The documentation',
          handler: () => {
            //this.iab.create('http://kb.sites.apiit.edu.my/question/apkey-troubleshooting/', '_blank', 'location=true');
          }
        }
      ]
    }).then(confirm => confirm.present());
  }

  cacheApi(role: Role) {
    // tslint:disable-next-line:no-bitwise
    const caches = role & Role.Student
      ? ['/student/profile', '/student/courses', '/staff/listing']
      : ['/staff/profile', '/staff/listing'];
    caches.forEach(endpoint => this.ws.get(endpoint, true).subscribe());
  }

  checkAndRedirect() {
    // check user role
    const role = this.settings.get('role');

    this.events.publish('login', role);
    // tslint:disable-next-line: no-bitwise
    if (role & Role.Student) {
      // is student, check declaration status
      this.sConfig.checkDeclaration(this.apkey).subscribe(res => {
        // 200 -> has declared
        // 404 -> has not declared
        if (res.status === 200) {
          this.router.navigate(['student-task-view']);
        } else if (res.status === 204) {
          this.router.navigate(['int-declaration']);
        } else {
          this.showToastMessage('Something went wrong while redirecting, please try again later!');
        }
      });
      // tslint:disable-next-line: no-bitwise
    } else if (role & Role.Admin) {
      this.sConfig.checkDeclaration(this.apkey).subscribe(res => {
        this.router.navigate(['student-search']);
      });
      // tslint:disable-next-line: no-bitwise
    } else if (role & Role.Lecturer) {
      this.sConfig.checkDeclaration(this.apkey).subscribe(res => {
        this.router.navigate(['meeting-confirmation-approval']);
      });
    } else {
      // implement superuser and career centre here
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
