import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { FormConfigService } from '../../services/formConfig/form-config.service';
import { UniqueName } from './form-name-validator';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.page.html',
  styleUrls: ['./create-form.page.scss'],
})
export class CreateFormPage implements OnInit {
  public form: FormGroup;

  selectedType: string;

  // tslint:disable-next-line: variable-name
  validation_messages = {
    title: [
      { type: 'required', message: 'Field name cannot be empty.' },
      { type: 'pattern', message: 'Field name must start with uppercase with minimum 3 letters.' }
    ],
    fname: [
      { type: 'required', message: 'Form name cannot be empty.'},
      { type: 'uniqueName', message: 'Form name already exists!'}
    ]
  };

  constructor(public alertCtrl: AlertController, private _FB: FormBuilder, private formConfigService: FormConfigService) {
    // Define the FormGroup object for the form
    // (with sub-FormGroup objects for handling
    // the dynamically generated form input fields)
    this.form = this._FB.group({
      fname: ['', Validators.compose([Validators.required, UniqueName(this.formConfigService)])],
      cfields: this._FB.array([
        this.initCustomFields()
      ])
    });
  }

  /**
   * Generates a FormGroup object with input field validation rules for
   * the custom form object
   */
  initCustomFields(): FormGroup {
    return this._FB.group({
      type: ['text', Validators.required],
      isRequired: [true, Validators.required],
      display: ['selected'],
      selected: [true],
      title: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Z].*')])],
      options: ['']
    });
  }

  addNewInputField(): void {
    const control = this.form.controls.cfields as FormArray;
    control.push(this.initCustomFields());
  }

  removeInputField(i: number): void {
    const control = this.form.controls.cfields as FormArray;
    control.removeAt(i);
  }

  receive(val: any): void {
    this.formConfigService.submitNewForm(val);

    const alert = this.alertCtrl.create({
      message: 'Form is successfully created.',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }

  getErrorList(errorObject) {
    return Object.keys(errorObject);
  }

  ngOnInit() {
  }

  varConvert(val) {
    return val.toLowerCase().replace(/\s/g, '');
  }
}
