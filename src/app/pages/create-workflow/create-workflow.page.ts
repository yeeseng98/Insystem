import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.page.html',
  styleUrls: ['./create-workflow.page.scss'],
})
export class CreateWorkflowPage implements OnInit {

  public form: FormGroup;

  // tslint:disable-next-line: variable-name
  validation_messages = {
    name: [
        { type: 'required', message: 'Variable name is required.' },
        { type: 'pattern', message: 'Variable name must start with lowercase without any spaces.' }
      ],
    title: [
      { type: 'required', message: 'Field name is required.' },
      { type: 'pattern', message: 'Field name must start with uppercase with minimum 3 letters.' }    ]
  };

  constructor(private _FB: FormBuilder) {
    // Define the FormGroup object for the form
    // (with sub-FormGroup objects for handling
    // the dynamically generated form input fields)
    console.log('building');
    this.form = this._FB.group({
      fname: ['', Validators.required],
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
      name: ['', Validators.compose([Validators.required, Validators.pattern('^(\\d|\\w)+$')])],
      type: ['text', Validators.required],
      isRequired: ['yes', Validators.required],
      display : ['selected'],
      selected: ['true'],
      title: [name, Validators.compose([Validators.required, Validators.pattern('^[A-z][a-z0-9_-]{2,19}$')])],
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
    console.dir(val);
  }

  getErrorList(errorObject) {
    return Object.keys(errorObject);
  }

  ngOnInit() {
  }

}