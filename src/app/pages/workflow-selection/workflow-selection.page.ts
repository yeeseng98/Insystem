import { Component, OnInit } from '@angular/core';
import { WorkflowConfigService } from 'src/app/services/workflowConfig/workflow-config.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-workflow-selection',
  templateUrl: './workflow-selection.page.html',
  styleUrls: ['./workflow-selection.page.scss'],
})
export class WorkflowSelectionPage implements OnInit {

  workflows: any[] = [];
  intakeId = '';
  form: FormGroup;
  endDate;
  minDate;
  maxDate;
  workflowDays;

  constructor(private datePipe: DatePipe, private _FB: FormBuilder,
    public route: ActivatedRoute, public workflowConfigService: WorkflowConfigService) {
    this.route.queryParams.subscribe(params => {
      this.intakeId = params['intakeId'];
    });

    workflowConfigService.getExistingWorkflows()
      .map(res => res.json())
      .subscribe(response => {
        let json_data = JSON.parse(JSON.stringify(response));

        // tslint:disable-next-line: forin
        json_data.forEach((element) => {
          workflowConfigService.getWorkflowPhases(element.WorkflowID).map(res => res.json())
            .subscribe(resp => {

              let data = JSON.parse(JSON.stringify(resp));
              let totalDuration = 0;

              data.forEach((phase) => {
                totalDuration = totalDuration + phase.phaseDuration;
              });

              const workObj = {
                workflowId: element.WorkflowID,
                workflowName: element.WorkflowName,
                totalDur: totalDuration
              };
              this.workflows.push(workObj);
            });
        });
      });

    const date = new Date();
    this.minDate = this.datePipe.transform(date, 'yyyy-MM-dd');

    const calDate = date.setDate(date.getDate() + 365 * 5);
    this.maxDate = this.datePipe.transform(calDate, 'yyyy-MM-dd');

    this.form = this._FB.group({
      workflowId: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  workSelected(event) {
    this.workflowDays = this.form.get('workflowId').value.totalDur + ' days';
  }
  calEndDate(event) {
    console.log(event);
    const converted = this.datePipe.transform(event, 'yyyy-MM-dd');
    const selectedDate = new Date(converted);
    console.log(selectedDate.getDate());
    selectedDate.setDate(selectedDate.getDate() + this.form.get('workflowId').value.totalDur);
    this.endDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
  }

  receive(val) {
    const obj = {
      intakeCode: this.intakeId,
      workflowId: val.workflowId.workflowId,
      startDate: this.datePipe.transform(val.startDate, 'yyyy-MM-dd'),
      endDate: this.endDate
    };
    console.log(obj);
    this.workflowConfigService.assignWorkflow(obj);
  }
}
