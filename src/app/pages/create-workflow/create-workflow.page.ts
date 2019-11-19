import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { FormConfigService } from 'src/app/services/formConfig/form-config.service';
import { WorkflowConfigService } from 'src/app/services/workflowConfig/workflow-config.service';
import { UniqueName } from './workflow-name-validator';
import { AlertController } from '@ionic/angular';

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
      { type: 'pattern', message: 'This field must be a whole number and cannot be zero.' }
    ],
    phaseName: [
      { type: 'required', message: 'Phase Name cannot be empty.' }
    ]
  };

  constructor(private _FB: FormBuilder, formConfigService: FormConfigService,
              public workflowConfigService: WorkflowConfigService, public alertCtrl: AlertController) {

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
      phaseDuration: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9][0-9]*$')])]
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
    // check if each phase has 1 task at least;
    console.log(val);

    let phase1Flag = false;
    let phase2Flag = false;
    let phase3Flag = false;
    let phase4Flag = false;
    let phase5Flag = false;
    let phase6Flag = false;
    let phase7Flag = false;
    let phase8Flag = false;
    let phase9Flag = false;
    let phase10Flag = false;

    const workflowField = val['cfields'];

    for (let i = 1; i <= val['phaseCount'] ; i++) {
      if (i === 1) {
        phase1Flag = true;
      } else if (i === 2) {
        phase2Flag = true;
      } else if (i === 3) {
        phase3Flag = true;
      } else if (i === 4) {
        phase4Flag = true;
      } else if (i === 5) {
        phase5Flag = true;
      } else if (i === 6) {
        phase6Flag = true;
      } else if (i === 7) {
        phase7Flag = true;
      } else if (i === 8) {
        phase8Flag = true;
      } else if (i === 9) {
        phase9Flag = true;
      } else if (i === 10) {
        phase10Flag = true;
      }
    }

    for (let i in workflowField) {
      if (workflowField[i].phaseLevel === 'Phase 1') {
        phase1Flag = false;
      } else if (workflowField[i].phaseLevel === 'Phase 2') {
        phase2Flag = false;
      } else if (workflowField[i].phaseLevel === 'Phase 3') {
        phase3Flag = false;
      } else if (workflowField[i].phaseLevel === 'Phase 4') {
        phase4Flag = false;
      } else if (workflowField[i].phaseLevel === 'Phase 5') {
        phase5Flag = false;
      } else if (workflowField[i].phaseLevel === 'Phase 6') {
        phase6Flag = false;
      } else if (workflowField[i].phaseLevel === 'Phase 7') {
        phase7Flag = false;
      } else if (workflowField[i].phaseLevel === 'Phase 8') {
        phase8Flag = false;
      } else if (workflowField[i].phaseLevel === 'Phase 9') {
        phase9Flag = false;
      } else if (workflowField[i].phaseLevel === 'Phase 10') {
        phase10Flag = false;
      }
    }

    if (!phase1Flag && !phase2Flag && !phase3Flag && !phase4Flag &&
        !phase5Flag && !phase6Flag && !phase7Flag && !phase8Flag &&
        !phase9Flag && !phase10Flag) {
      // solve bug where first fromid selectbox is null.
      for (let i in workflowField) {
        if (workflowField[i].type === 'form' && workflowField[i].form == null) {
          val['cfields'][i].form = this.defForm;
        }
      }

      this.workflowConfigService.submitNewWorkflow(val);
    } else {
      const alert = this.alertCtrl.create({
        message: 'Please ensure that each phase has at least one task!',
        subHeader: 'Error!',
        buttons: ['Dismiss']
      }).then(alert => alert.present());
    }
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
