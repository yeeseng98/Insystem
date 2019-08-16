import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { FormConfigService } from 'src/app/services/formConfig/form-config.service';
import { WorkflowConfigService } from 'src/app/services/workflowConfig/workflow-config.service';
import { UniqueName } from './workflow-name-validator';

@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.page.html',
  styleUrls: ['./create-workflow.page.scss'],
})
export class CreateWorkflowPage implements OnInit {

  forms = [];
  phaseSet = [];
  defForm;
  oldSelection = 0;

  public form: FormGroup;

  // tslint:disable-next-line: variable-name
  validation_messages = {
    title: [
      { type: 'required', message: 'Task name is required.' },
      { type: 'pattern', message: 'Task name must start with an uppercase letter.' }
    ],
    fname: [
      { type: 'required', message: 'Workflow name cannot be empty.' },
      { type: 'uniqueName', message: 'Workflow name already exists!' }
    ],
    phaseDuration: [
      { type: 'required', message: 'Duration cannot be empty.' },
      { type: 'pattern', message: 'This field must be a whole number.' }
    ],
    phaseName: [
      { type: 'required', message: 'Phase Name cannot be empty.' }
    ]
  };

  constructor(private _FB: FormBuilder, formConfigService: FormConfigService,
              public workflowConfigService: WorkflowConfigService) {

    // Define the FormGroup object for the form
    // (with sub-FormGroup objects for handling
    // the dynamically generated form input fields)
    this.form = this._FB.group({
      fname: ['', Validators.compose([Validators.required, UniqueName(this.workflowConfigService)])],
      phaseCount: ['', Validators.required],
      phaseInfo: this._FB.array([

      ]),
      cfields: this._FB.array([
        this.initCustomFields()
      ])
    });

    // fetch existing forms
    formConfigService.getFormList()
      .map(res => res.json())
      .subscribe(response => {
        let json_data = JSON.parse(JSON.stringify(response));

        // tslint:disable-next-line: forin
        json_data.forEach((element) => {
          const formObj = {
            formId: element.FormID,
            formName: element.FormName
          };
          this.forms.push(formObj);
        });

        if (this.forms.length > 0) {
          this.defForm = this.forms[0];
          this.form.get(['cfields', 'form']).setValue(this.defForm);
        }

      });
  }

  initPhaseFields(): FormGroup {
    return this._FB.group({
      phaseName: ['', Validators.required],
      phaseDuration: [0, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]
    });
  }

  /**
   * Generates a FormGroup object with input field validation rules for
   * the custom form object
   */
  initCustomFields(): FormGroup {
    return this._FB.group({
      type: ['file', Validators.required],
      isRequired: [true],
      display: ['selected'],
      selected: [true],
      title: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Z].*')])],
      desc: [''],
      form: [this.forms[0]],
      phaseLevel: ['', Validators.required]
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
    // solve bug where first fromid selectbox is null.
    const checker = val['cfields'];
    for (let i in checker) {
      if ( checker[i].type === 'form' && checker[i].form == null) {
        val['cfields'][i].form = this.defForm;
      }
    }
    this.workflowConfigService.submitNewWorkflow(val);
  }

  getErrorList(errorObject) {
    return Object.keys(errorObject);
  }

  appendPhase(phases: any) {

    // this.phaseSet = [];

    const control = this.form.controls.phaseInfo as FormArray;
    for (let i = 0; i < this.oldSelection; i++) {
      this.phaseSet.shift();
      // console.log('pop');
      // console.log(this.phaseSet);
      control.removeAt(0);
    }

    for (let i = 0; i < phases; i++) {
      this.phaseSet.push('Phase ' + (i + 1));
      control.push(this.initPhaseFields());

      // console.log('push');
      // console.log(this.phaseSet);
    }

    this.oldSelection = phases;
  }

  ngOnInit() {
  }

}
