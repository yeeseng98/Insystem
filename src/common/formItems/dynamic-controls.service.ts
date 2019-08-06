import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlBase } from './control-base';
import { requiredFileType } from './upload-file-validators';

@Injectable()
export class DynamicControlsService {
  constructor() {
  }

  toFormGroup(formGroup: FormGroup, controls: ControlBase<any>[]) {
    formGroup = formGroup || new FormGroup({});

    controls.forEach(control => {

      //TODO: Check why validator.required is not allowing file to pass through
      if (control.controlType === 'file' && !control.required) {
        let formControl = new FormControl(control.value || '', requiredFileType('docx'));
        formGroup.addControl(control.key, formControl);

      } else {
        let formControl = control.required
          ? new FormControl(control.value || '', Validators.required)
          : new FormControl(control.value || '');
        formGroup.addControl(control.key, formControl);
      }
    });

    return formGroup;
  }
}