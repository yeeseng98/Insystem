import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlBase } from './control-base';
import { DynamicControlsService } from './dynamic-controls.service';
import { FormConfigService } from 'src/app/services/formConfig/form-config.service';
import { FileConfigService } from 'src/app/services/fileConfig/file-config.service';
import { Observable } from 'rxjs';
import { StudentProfile } from 'src/app/interfaces/student-profile';
import { WsApiService } from 'src/app/services/wsApiService/ws-api.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  exportAs: 'dynamicForm',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() controls: ControlBase<any>[] = [];
  @Input() form: FormGroup;
  @Output() submit: EventEmitter<any> = new EventEmitter();

  profile$: Observable<StudentProfile>;

  constructor(private dynamicControlsService: DynamicControlsService,
    private formConfig: FormConfigService, private fileConfig: FileConfigService,
    private ws: WsApiService) {

  }

  ngOnInit() {
    this.form = this.dynamicControlsService.toFormGroup(this.form, this.controls);

    let taskId;
    let adminAccess = false;
    this.formConfig.currentTask.subscribe(message => taskId = message);

    this.formConfig.isAdmin.subscribe(message => adminAccess = message);

    // updates form with previously submitted values.
    if (!adminAccess) {
      this.profile$ = this.ws.get<StudentProfile>('/student/profile');

      this.profile$.subscribe(std => {
        this.controls.forEach(element => {
          let value;
          // tslint:disable-next-line: max-line-length
          value = this.formConfig.getSubmittedFormData(element.key, std.STUDENT_NUMBER, taskId).map(res => res.json()).subscribe(response => {
            const data = JSON.parse(JSON.stringify(response));

            if (data != null) {
              if (element.controlType === 'file') {
                this.fileConfig.getExistingFormFile(element.key, std.STUDENT_NUMBER, taskId).map(res => res.json()).subscribe(response => {
                  const data = JSON.parse(JSON.stringify(response));

                  data.forEach(x => {
                    element.fileName = x.fileName;
                  });
                });
              } else if (element.controlType === 'select') {
                data.forEach(x => {

                  const selections = element['options'];

                  // tslint:disable-next-line: prefer-for-of
                  for (let i = 0; i < selections.length; i++) {
                    if (selections[i]['key'] === x.value) {
                      this.form.controls[element.key].setValue(selections[i]);
                      break;
                    }
                  }
                });
              } else if (element.controlType === 'multi') {
                data.forEach(x => {

                  const selections = element['options'];

                  const preselections = x.value.split(',');
                  // tslint:disable-next-line: prefer-for-of
                  const allSelected = [];

                  // tslint:disable-next-line: prefer-for-of
                  for (let i = 0; i < selections.length; i++) {
                    // tslint:disable-next-line: prefer-for-of
                    for (let j = 0; j < preselections.length; j++) {
                      if (selections[i]['key'] === preselections[j]) {
                        allSelected.push(selections[i]);
                        break;
                      }
                    }
                  }
                  this.form.controls[element.key].setValue(allSelected);
                });
              } else {
                data.forEach(x => {
                  this.form.controls[element.key].setValue(x.value);
                });
              }
            }
          });
        });
      });
    }
  }

  onSubmit() {
    this.submit.next(this.form.value);
  }
}
