import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowConfigService } from 'src/app/services/workflowConfig/workflow-config.service';

@Component({
  selector: 'app-intake-workflow-details',
  templateUrl: './intake-workflow-details.page.html',
  styleUrls: ['./intake-workflow-details.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IntakeWorkflowDetailsPage implements OnInit {
  public workflowId: any;
  public intakeId: any;
  public phases: any[] = [];
  public details = '';

  constructor(private route: ActivatedRoute, private router: Router, public configService: WorkflowConfigService) {
    const navigation = this.router.getCurrentNavigation();

    this.route.queryParams.subscribe(params => {
      this.workflowId = params['workflowId'];
      this.intakeId = params['intakeId'];

      this.configService.getAssignedDetails(this.intakeId, this.workflowId).map(res => res.json())
        .subscribe(response => {
          const data = JSON.parse(JSON.stringify(response));
          console.log(data);
          data.forEach(element => {
            this.phases.push(element);
          });

          this.intakeId = data[0].intakeID;
          this.details = '<p><h1>Assigned Workflow: ' + data[0].workflowID + '</h1><p><br>';

          const now = new Date();

          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.phases.length; i++) {

            if (now.getTime() >= new Date(this.phases[i].startDate).getTime() &&
              now.getTime() <= new Date(this.phases[i].endDate).getTime()) {
              this.details = this.details + '<div class="ongoing"> [ONGOING]';
              this.details = this.details + '<p><u><h2> Phase Name: ' + this.phases[i].phaseName;
              this.details = this.details + '&nbsp;&nbsp;&nbsp;&nbsp; ID: ' + this.phases[i].phaseID + ' </h2></u></p>';
              this.details = this.details + '<p><h2> Start Date: ' + this.phases[i].startDate + ' </h2></p>';
              this.details = this.details + '<p><h2> End Date: ' + this.phases[i].endDate + '</h2></p>';
              this.details = this.details + '<p><h2> Phase Duration: ' + this.phases[i].phaseDuration + ' days</h2></p>';
              this.details = this.details + '<br>';
              this.details = this.details + '</div>';
            } else {
              this.details = this.details + '<p><u><h2> Phase Name: ' + this.phases[i].phaseName;
              this.details = this.details + '&nbsp;&nbsp;&nbsp;&nbsp; ID: ' + this.phases[i].phaseID + ' </h2></u></p>';
              this.details = this.details + '<p><h2> Start Date: ' + this.phases[i].startDate + ' </h2></p>';
              this.details = this.details + '<p><h2> End Date: ' + this.phases[i].endDate + '</h2><p>';
              this.details = this.details + '<p><h2> Phase Duration: ' + this.phases[i].phaseDuration + ' days</h2><p>';
              this.details = this.details + '<br>';
            }
          }
        });
    });
  }

  ngOnInit() {
  }

}
