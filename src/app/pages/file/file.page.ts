import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskConfigService } from 'src/app/services/taskConfig/task-config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { requiredFileType } from 'src/common/formItems/upload-file-validators';
import { FileConfigService } from 'src/app/services/fileConfig/file-config.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.page.html',
  styleUrls: ['./file.page.scss'],
})
export class FilePage implements OnInit {

  public studentId: any;
  public taskId: any;
  public taskDesc: any;
  public taskName: any;
  public form: FormGroup;
  public isLocked: boolean = true;

  filedata;

  constructor(private _FB: FormBuilder, public route: ActivatedRoute,
    public taskConfigService: TaskConfigService, public fileConfig: FileConfigService) {

    this.form = this._FB.group({
      file: ['', requiredFileType('docx')]
    });
    this.route.queryParams.subscribe(params => {
      this.studentId = params['studentId'];
      this.taskId = params['taskId'];

      taskConfigService.isLocked.subscribe(message => this.isLocked = message);

      this.taskConfigService.getFileTask(this.taskId).map(res => res.json()).subscribe(response => {
        const json_data = JSON.parse(JSON.stringify(response));

        this.taskName = json_data[0].taskName;
        this.taskDesc = json_data[0].desc;
      }
      );

    });
  }

  ngOnInit() {
  }

  fileEvent(e) {
    this.filedata = e.target.files[0];
  }

  receive(val: any) {
    console.log(this.filedata);
    this.fileConfig.insertFile(this.filedata, this.taskId);
  }
}
