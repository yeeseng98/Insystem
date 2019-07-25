import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlsService } from '../../../../common/formItems/controls.service';
import { ControlBase } from '../../../../common/formItems/control-base';
import { FormConfigService } from '../../../services/formConfig/form-config.service';
import 'rxjs/add/operator/map';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {

  form: FormGroup;
  controls: ControlBase<any>[];
  submitted: any;

  filename = '/form1-conf.json';

  constructor(public configService: FormConfigService, public controlsService: ControlsService, public alertCtrl: AlertController) {
    this.form = new FormGroup({});
  }

  ionViewWillEnter() {
    this.configService.getFormConfig(this.filename)
      .map(res => res.json())
      .subscribe(response => {
        this.controls = this.controlsService.getControls(response);
      });

    this.form.valueChanges
      .subscribe(val => {
        this.submitted = val;
      });
  }

  submitForm($event) {
    const alert = this.alertCtrl.create({
      message: 'Your form is successfully submitted!',
      subHeader: 'Success!',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
    console.log('Success!\n', this.submitted);
  }

}
