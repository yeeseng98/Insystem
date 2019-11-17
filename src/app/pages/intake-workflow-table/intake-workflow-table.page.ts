import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { WorkflowConfigService } from 'src/app/services/workflowConfig/workflow-config.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-intake-workflow-table',
  templateUrl: './intake-workflow-table.page.html',
  styleUrls: ['./intake-workflow-table.page.scss'],
  encapsulation: ViewEncapsulation.None

})


export class IntakeWorkflowTablePage implements OnInit {

  rows = [];
  temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private workflowConfigService: WorkflowConfigService, private router: Router) {
    this.workflowConfigService.getAllAssignedFlows().map(res => res.json()).subscribe(response => {
      this.temp = [...JSON.parse(JSON.stringify(response))];

      this.rows = JSON.parse(JSON.stringify(response));
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.intakeCode.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnInit() {
  }

  getRowClass(row) {
    const now = new Date();

    console.log(row.startDate);
    console.log(row.endDate);
    if (now.getTime() >= new Date(row.startDate).getTime() &&
      now.getTime() <= new Date(row.endDate).getTime()) {
      console.log(row);
      return 'focus';
    }
  }

  goto(workflowID, intakeID) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        workflowId: workflowID,
        intakeId: intakeID
      }
    };
    this.router.navigate(['intake-workflow-details'], navigationExtras);
  }
}
