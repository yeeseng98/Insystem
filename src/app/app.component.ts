import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Form',
      url: '/form',
      icon: 'form'
    },
    {
      title: 'Create Form',
      url: '/create-form',
      icon: 'create-form'
    },
    {
      title: 'Create Workflow',
      url: '/create-workflow',
      icon: 'create-workflow'
    },
    {
      title: 'Form Table',
      url: '/form-table',
      icon: 'form-table'
    },
    {
      title: 'Workflow Table',
      url: '/workflow-table',
      icon: 'workflow-table'
    },
    {
      title: 'Assign Workflow',
      url: '/assign-workflow',
      icon: 'assign-workflow'
    },
    {
      title: 'Student Task View',
      url: '/student-task-view',
      icon: 'student-task-view'
    },
    {
      title: 'Request Meeting',
      url: '/meeting-confirmation-request',
      icon: 'meeting-confirmation-request'
    },
    {
      title: 'Meeting Approval',
      url: '/meeting-confirmation-approval',
      icon: 'meeting-confirmation-approval'
    },
    {
      title: 'Resource Table',
      url: '/resource-table',
      icon: 'resource-table'
    },
    {
      title: 'Download Internship Resources',
      url: '/resource-download',
      icon: 'resource-download'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
