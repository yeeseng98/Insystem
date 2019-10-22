import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
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
      title: 'Request Meeting',
      url: '/meeting-confirmation-request',
      icon: 'contacts'
    },
    {
      title: 'Meeting Approval',
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
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController
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
