import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router, NavigationExtras } from '@angular/router';
import { WorkflowConfigService } from 'src/app/services/workflowConfig/workflow-config.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-workflow-table',
  templateUrl: './workflow-table.page.html',
  styleUrls: ['./workflow-table.page.scss'],
})
export class WorkflowTablePage implements OnInit {

  rows = [];
  temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private workflowConfigService: WorkflowConfigService, private router: Router) {
    this.workflowConfigService.getExistingWorkflows().map(res => res.json()).subscribe(response => {
      this.temp = [...JSON.parse(JSON.stringify(response))];

      this.rows = JSON.parse(JSON.stringify(response));
    });
  }

  ngOnInit() {
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.WorkflowName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  goto(event) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        workflowId: event
      }
    };
    this.router.navigate(['workflow-details'], navigationExtras);
  }
}
