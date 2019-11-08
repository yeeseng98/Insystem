import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { WorkflowConfigService } from 'src/app/services/workflowConfig/workflow-config.service';

@Component({
  selector: 'app-intake-workflow-view',
  templateUrl: './intake-workflow-view.page.html',
  styleUrls: ['./intake-workflow-view.page.scss'],
})
export class IntakeWorkflowViewPage implements OnInit {

  public hasSearchedByWorkflow = false;
  public hasSearchedByIntake = false;
  public workflowId: string;
  public intakeId: string;
  public intakeArray: any[];

  sWorkflowID: string;
  sWorkflowName: string;
  sIntakeCode: string;
  sStartDate: string;
  sEndDate: string;
  isReassignable = false;

  constructor(private alertCtrl: AlertController, private wConfig: WorkflowConfigService) { }

  ngOnInit() {
  }

  searchByWorkflow() {
    this.wConfig.getIntakesByWorkflow(this.workflowId).map(res => res.json()).subscribe(res => {
      const json_data = JSON.parse(JSON.stringify(res));

      if (json_data.length > 0) {

        this.intakeArray = [];

        json_data.forEach(element => {

          let intakeObj = {
            workflowID: element.workflowID,
            workflowName: element.workflowName,
            intakeCode: element.intakeCode,
            startDate: element.startDate,
            endDate: element.endDate
          };

          this.intakeArray.push(intakeObj);
        });

        console.log(this.intakeArray);
        this.hasSearchedByWorkflow = true;
      } else {
        this.generateAlert('The workflow is not assigned to any intakes or does not exists.');
      }
    });
  }

  searchByIntake() {
    this.wConfig.getWorkflowByIntake(this.intakeId).map(res => res.json()).subscribe(res => {
      const json_data = JSON.parse(JSON.stringify(res));

      if (json_data.length > 0) {
        json_data.forEach(element => {
          this.sWorkflowID = element.workflowID;
          this.sWorkflowName = element.workflowName;
          this.sStartDate = element.startDate;
          this.sEndDate = element.endDate;
          this.sIntakeCode = element.intakeCode;

          const now = new Date();

          if (now.getTime() < new Date(element.startDate).getTime()) {
            this.isReassignable = true;
          }
        });

        this.hasSearchedByIntake = true;
      } else {
        this.generateAlert('The intake is not assigned to any workflow yet or does not exist!');
      }
    });
  }

  generateAlert(response) {
    const alert = this.alertCtrl.create({
      message: response,
      buttons: ['Dismiss']
    }).then(alert => alert.present());

    return alert;
  }
}
