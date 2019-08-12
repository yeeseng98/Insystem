import { Component, OnInit } from '@angular/core';
import { WorkflowConfigService } from 'src/app/services/workflowConfig/workflow-config.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-workflow-selection',
  templateUrl: './workflow-selection.page.html',
  styleUrls: ['./workflow-selection.page.scss'],
})
export class WorkflowSelectionPage implements OnInit {

  workflows: any[] = [];
  intakeId = '';
  form: FormGroup;

  constructor(private _FB: FormBuilder, public route: ActivatedRoute, public workflowConfigService: WorkflowConfigService) {
    this.route.queryParams.subscribe(params => {
      this.intakeId = params['intakeId'];
    });

    workflowConfigService.getExistingWorkflows()
      .map(res => res.json())
      .subscribe(response => {
        let json_data = JSON.parse(JSON.stringify(response));

        // tslint:disable-next-line: forin
        json_data.forEach((element) => {
          const workObj = {
            workflowId: element.WorkflowID,
            workflowName: element.WorkflowName
          };
          this.workflows.push(workObj);
        });
      });

    this.form = this._FB.group({
      workflowId: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  ngOnInit() {
  }


}
