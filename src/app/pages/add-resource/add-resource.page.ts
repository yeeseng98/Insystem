import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { requiredFileType } from 'src/common/formItems/upload-file-validators';
import { FileConfigService } from 'src/app/services/fileConfig/file-config.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.page.html',
  styleUrls: ['./add-resource.page.scss'],
})
export class AddResourcePage implements OnInit {

  public form: FormGroup;
  public filedata;

  constructor(private _FB: FormBuilder, public alertCtrl: AlertController, public fileConfig: FileConfigService) {
    this.form = this._FB.group({
      file: ['', requiredFileType('docx')],
      tFaculty: ['All', Validators.required]
    });
  }

  receive(val: any): void {
    this.fileConfig.insertResource(this.filedata, val.tFaculty);
    const alert = this.alertCtrl.create({
      message: 'Resource was successfully inserted!',
      subHeader: 'Success!',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }

  fileEvent(e) {
    this.filedata = e.target.files[0];
  }

  ngOnInit() {
  }

}