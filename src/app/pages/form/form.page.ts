import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlsService } from '../../components/formItems/controls.service';
import { ControlBase } from '../../components/formItems/control-base';
import { FormConfigService } from '../../services/formConfig/form-config.service';
import 'rxjs/add/operator/map';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TaskConfigService } from 'src/app/services/taskConfig/task-config.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Role } from 'src/app/interfaces/settings';
import { WsApiService } from 'src/app/services/wsApiService/ws-api.service';
import { Observable } from 'rxjs';
import { StudentProfile } from 'src/app/interfaces/student-profile';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {

  profile$: Observable<StudentProfile>;

  form: FormGroup;
  controls: ControlBase<any>[];
  submitted: any;

  public formId: any;
  public studentId: any;
  public taskId: any;
  public adminAccess: false;
  public isLocked: boolean =  true;

  constructor(private route: ActivatedRoute, public configService: FormConfigService,
              public controlsService: ControlsService, public taskService: TaskConfigService,
              public alertCtrl: AlertController, settings: SettingsService, private ws: WsApiService) {

    this.form = new FormGroup({});
    this.route.queryParams.subscribe(params => {
      this.formId = params['formId'];
      this.studentId = params['studentId'];
      this.taskId = params['taskId'];

      const role = settings.get('role');
      // tslint:disable-next-line: no-bitwise
      if (role & Role.Admin) {
        this.configService.changeAccess(this.adminAccess);
      }

      taskService.isLocked.subscribe(message => this.isLocked = message);

      this.configService.getFormConfig(this.formId)
        .map(res => res.json())
        .subscribe(response => {
          configService.changeTasks(this.taskId);

          const formMap = JSON.parse(JSON.stringify(response), (k, v) => v === 'true' ? true : v === 'false' ? false : v);
          this.controls = this.controlsService.getControls(formMap);
        });
    });

    this.form.valueChanges
      .subscribe(val => {
        this.submitted = val;
      });
  }

  submitForm($event) {
    this.profile$ = this.ws.get<StudentProfile>('/student/profile');

    this.profile$.subscribe(std => {
      this.configService.submitFormValues(this.submitted, this.taskId, std.STUDENT_NUMBER);
    });
  }

}
