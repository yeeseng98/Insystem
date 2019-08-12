import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class WorkflowConfigService {

  private API: string = 'http://127.0.0.1:5000/';

  constructor(private http: Http) { }

  // get workflow names for validation
  public getWorkflowValidation() {
    return this.http.get(this.API + 'workflowNameValidation');
  }

  // get all workflow objects
  public getExistingWorkflows() {
    return this.http.get(this.API + 'workflowList');
  }

  // get specific workflow's phases
  public getWorkflowPhases(workflowId: string) {
    const params = {
      workflowId: workflowId
    };
    return this.http.get(this.API + 'phaseData', { search: params });
  }

  // get full info of specific workflow
  public getSelectedWorkflow(workflowId: string) {
    const params = {
      workflowId: workflowId
    };

    return this.http.get(this.API + 'getWorkflow', { search: params });
  }

  // This method is used for creating a new workflow.
  public submitNewWorkflow(val: any) {
    const workflowName = val['fname'];
    const workflowField = val['cfields'];
    const phaseInfo = val['phaseInfo'];

    const workflow = {
      workflowId: this.varConvert(workflowName),
      fname: workflowName
    };

    this.http.post(this.API + 'newWorkflow', workflow).subscribe(response => console.log(response));

    // tslint:disable-next-line: forin
    for (let i = 0; i < phaseInfo.length; i++) {
      const phaseKey = this.varConvert(workflowName) + 'phase' + (i + 1);

      const phaseinfo = {
        workflowId: this.varConvert(workflowName),
        phaseId: phaseKey,
        phaseDuration: phaseInfo[i].phaseDuration,
        phaseName: phaseInfo[i].phaseName,
        phaseOrder: i + 1
      };
      console.log(phaseinfo);
      this.http.post(this.API + 'writePhases', phaseinfo).subscribe(response => console.log(response));
    }
    // tslint:disable-next-line: forin
    for (let i in workflowField) {

      const phaseKey = this.varConvert(workflowName) + this.varConvert(workflowField[i].phaseLevel);
      const taskKey = phaseKey + this.varConvert(workflowField[i].title);

      if (workflowField[i].type === 'form') {
        const field = {
          phaseId: phaseKey,
          taskId: taskKey,
          taskName: workflowField[i].title,
          taskType: workflowField[i].type,
          formId: workflowField[i].form.formId
        };

        console.log(field);
        this.http.post(this.API + 'writeTasks', field).subscribe(response => console.log(response));
      } else {
        const field = {
          phaseId: phaseKey,
          taskId: taskKey,
          taskName: workflowField[i].title,
          taskType: workflowField[i].type,
        };
        console.log(field);
        this.http.post(this.API + 'writeTasks', field).subscribe(response => console.log(response));
      }
    }
  }

  // used for assigning intake to workflow
  public assignWorkflow(val: any) {
    const assignInfo = {
      intakeCode: val['intakeCode'],
      workflowId: val['workflowId'],
      startDate: val['startDate'],
      endDate: val['endDate']
    };
    this.http.post(this.API + 'assignFlow', assignInfo).subscribe(response => console.log(response));
  }

  varConvert(val) {
    return val.toLowerCase().replace(/\s/g, '');
  }
}
