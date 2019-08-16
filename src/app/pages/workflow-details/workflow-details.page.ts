import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowConfigService } from 'src/app/services/workflowConfig/workflow-config.service';
import { PhaseObj } from '../../models/phaseObj';

@Component({
  selector: 'app-workflow-details',
  templateUrl: './workflow-details.page.html',
  styleUrls: ['./workflow-details.page.scss'],
})

export class WorkflowDetailsPage implements OnInit {

  public workflowId: any;
  public data;
  public allTasks: any[] = [];
  public workflowInfo = '';

  constructor(private route: ActivatedRoute, private router: Router, public configService: WorkflowConfigService) {

    const navigation = this.router.getCurrentNavigation();
    this.workflowId = navigation.extras.state ? navigation.extras.state.workflowId : 0;

    this.route.queryParams.subscribe(params => {

      // this.workflowId = params['workflowId'];

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

          this.workflowInfo = '<h2> Date Created: ' + this.allTasks[0].dateCreated + '</h2>';
          this.workflowInfo = this.workflowInfo + '<br> <h1> Workflow Name:' + this.allTasks[0].workflowName;
          this.workflowInfo = this.workflowInfo + '        ID:' + this.allTasks[0].workflowID + '</h1>';

          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < phaseArray.length; i++) {
            this.workflowInfo = this.workflowInfo + '<br> <h2> Phase ' + phaseArray[i].phaseNum + ' </h2>';
            this.workflowInfo = this.workflowInfo + '<br> <h2> Phase Duration: ' + phaseArray[i].phaseDur + ' days</h2>';

            this.allTasks.forEach((task) => {

              if (task.phaseOrder === phaseArray[i].phaseNum) {
                this.workflowInfo = this.workflowInfo + '<br> <h3> Task Name: ' + task.taskName;
                this.workflowInfo = this.workflowInfo + '        ID: ' + task.taskID + ' </h3>';
                this.workflowInfo = this.workflowInfo + '<h3> Task Instruction: ' + task.desc + ' </h3>';
                this.workflowInfo = this.workflowInfo + '<h3> Task Type: ' + task.taskType + '</h3>';
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
