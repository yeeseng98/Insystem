import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { requiredFileType } from 'src/common/formItems/upload-file-validators';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.page.html',
  styleUrls: ['./add-resource.page.scss'],
})
export class AddResourcePage implements OnInit {

  public form: FormGroup;

  constructor(private _FB: FormBuilder, public alertCtrl: AlertController) {
    this.form = this._FB.group({
      file: ['', requiredFileType('docx')],
      tFaculty: ['', Validators.required]
    });
  }

  receive(val: any): void {
    console.log(val);
  }
  ngOnInit() {
  }

}
