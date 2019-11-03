import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccessConfigService } from './services/accessConfig/access-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'build'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Create Form',
      url: '/create-form',
      icon: 'paper'
    },
    {
      title: 'Create Workflow',
      url: '/create-workflow',
      icon: 'logo-buffer'
    },
    {
      title: 'Form Table',
      url: '/form-table',
      icon: 'list'
    },
    {
      title: 'Workflow Table',
      url: '/workflow-table',
      icon: 'list'
    },
    {
      title: 'Assign Workflow',
      url: '/assign-workflow',
      icon: 'return-right'
    },
    {
      title: 'Student Task View',
      url: '/student-task-view',
      icon: 'checkbox'
    },
    {
      title: 'Discussion Verification Request',
      url: '/meeting-confirmation-request',
      icon: 'contacts'
    },
    {
      title: 'Discussion Content Approval',
      url: '/meeting-confirmation-approval',
      icon: 'contacts'
    },
    {
      title: 'Resource Table',
      url: '/resource-table',
      icon: 'list'
    },
    {
      title: 'Add New Internship Resource',
      url: '/add-resource',
      icon: 'cloud-upload'
    },
    {
      title: 'Authority Delegation',
      url: '/authority-delegation',
      icon: 'build'
    },
    {
      title: 'Internship Declaration',
      url: '/int-declaration',
      icon: 'disc'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController,
    public accessConfig: AccessConfigService
  ) {

    // do role identification here, match against:
    // STD - student, ADN - admin, CTF - career staff, SPV - supervisor

    // this.appPages = [];

    // accessConfig.getUserAccess('ADN').map(res => res.json()).subscribe(response => {
    //   const pages = JSON.parse(JSON.stringify(response));

    //   pages.forEach(element => {
    //     const pageObj ={
    //       title: element.pageName,
    //       url: element.pageUrl,
    //       icon: element.pageIcon
    //     };
    //     this.appPages.push(pageObj);
    //   });
    // });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
