import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowConfigService } from 'src/app/services/workflowConfig/workflow-config.service';
import { PhaseObj } from '../../interfaces/phaseObj';

@Component({
  selector: 'app-workflow-details',
  templateUrl: './workflow-details.page.html',
  styleUrls: ['./workflow-details.page.scss'],
})

export class WorkflowDetailsPage implements OnInit {

  public workflowId: any;
  public workflowName: any;
  public data;
  public allTasks: any[] = [];
  public workflowInfo = '';

  constructor(private route: ActivatedRoute, private router: Router, public configService: WorkflowConfigService) {

    const navigation = this.router.getCurrentNavigation();

    this.route.queryParams.subscribe(params => {

      this.workflowId = params['workflowId'];

      this.configService.getSelectedWorkflow(this.workflowId)
        .map(res => res.json())
        .subscribe(response => {
          this.data = JSON.parse(JSON.stringify(response));

          const phaseArray: PhaseObj[] = [];

          this.data.forEach((element) => {
            this.allTasks.push(element);

            const phaseobj = {
              phaseNum: element.phaseOrder,
              phaseDur: element.phaseDuration
            };

            if (!this.containsObject(phaseobj, phaseArray)) {
              phaseArray.push(phaseobj);
            }
            console.log(phaseArray);
          });

          this.workflowName = this.allTasks[0].workflowName;
          this.workflowInfo = '<p> Date Created: ' + this.allTasks[0].dateCreated + '<p>';
          this.workflowInfo = this.workflowInfo + '<p> ID: ' + this.allTasks[0].workflowID + '</p>';

          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < phaseArray.length; i++) {
            // tslint:disable-next-line: max-line-length
            this.workflowInfo = this.workflowInfo + '<br> <p><strong><h1> Phase ' + phaseArray[i].phaseNum + ' &nbsp; (' + phaseArray[i].phaseDur + ' Days) </h1></strong></p>';

            this.allTasks.forEach((task) => {

              if (task.phaseOrder === phaseArray[i].phaseNum) {
                this.workflowInfo = this.workflowInfo + '<p><h2> Task Name: ' + task.taskName;
                this.workflowInfo = this.workflowInfo + '&nbsp;&nbsp;&nbsp;&nbsp; ID: ' + task.taskID + ' </h2></p>';
                this.workflowInfo = this.workflowInfo + '<p><h2> Task Instruction: ' + task.desc + ' </h2></p>';
                this.workflowInfo = this.workflowInfo + '<p><h2> Task Type: ' + task.taskType + '</h2><p>';
                this.workflowInfo = this.workflowInfo + '<br>';
              }
            });
          }

        });
    });
  }

  ngOnInit() { }

  containsObject(obj: PhaseObj, list: PhaseObj[]) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < list.length; i++) {
      if (list[i].phaseNum === obj.phaseNum) {
        return true;
      }
    }

    return false;
  }

}
