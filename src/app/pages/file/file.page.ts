import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskConfigService } from 'src/app/services/taskConfig/task-config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { requiredFileType } from 'src/app/components/formItems/upload-file-validators';
import { FileConfigService } from 'src/app/services/fileConfig/file-config.service';
import { WsApiService } from 'src/app/services/wsApiService/ws-api.service';
import { Observable } from 'rxjs';
import { StudentProfile } from 'src/app/interfaces/student-profile';

@Component({
  selector: 'app-file',
  templateUrl: './file.page.html',
  styleUrls: ['./file.page.scss'],
})
export class FilePage implements OnInit {

  profile$: Observable<StudentProfile>;

  public studentId: any;
  public taskId: any;
  public taskDesc: any;
  public taskName: any;
  public form: FormGroup;
  public isLocked: boolean = true;
  public existFile;

  public filedata;

  constructor(private _FB: FormBuilder, public route: ActivatedRoute,
    public taskConfigService: TaskConfigService, public fileConfig: FileConfigService, private ws: WsApiService) {

    this.profile$ = this.ws.get<StudentProfile>('/student/profile');

    this.form = this._FB.group({
      file: ['', requiredFileType('pdf')]
    });

    this.profile$.subscribe(std => {
      this.route.queryParams.subscribe(params => {
        this.taskId = params['taskId'];

        taskConfigService.isLocked.subscribe(message => this.isLocked = message);

        this.taskConfigService.getFileTask(this.taskId).map(res => res.json()).subscribe(response => {
          const json_data = JSON.parse(JSON.stringify(response));

          this.taskName = json_data[0].taskName;
          this.taskDesc = json_data[0].desc;

          this.fileConfig.getExistingTaskFile(std.STUDENT_NUMBER, this.taskId).map(res => res.json()).subscribe(resp => {
            const data = JSON.parse(JSON.stringify(resp));

            data.forEach(element => {
              this.existFile = element.fileName;
            });
          });
        }
        );

      });
    });
  }

  ngOnInit() {
  }

  fileEvent(e) {
    this.filedata = e.target.files[0];
  }

  receive(val: any) {
    this.profile$.subscribe(std => {
      this.fileConfig.insertFile(this.filedata, this.taskId, std.STUDENT_NUMBER);
    });
  }
}
