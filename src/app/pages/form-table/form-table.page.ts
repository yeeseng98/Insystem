import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormConfigService } from 'src/app/services/formConfig/form-config.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.page.html',
  styleUrls: ['./form-table.page.scss'],
})
export class FormTablePage implements OnInit {
  rows = [];
  temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private router: Router, private http: HttpClient, private formConfigService: FormConfigService) {

  }


  ngOnInit() {
    this.formConfigService.getFormList().map(res => res.json()).subscribe(response => {
      this.temp = [...JSON.parse(JSON.stringify(response))];

      this.rows = JSON.parse(JSON.stringify(response));
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    // tslint:disable-next-line: only-arrow-functions
    const temp = this.temp.filter(function(d) {
      return d.FormName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  goto(event) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        formId: event,
        adminAccess: true
      }
    };
    this.router.navigate(['form'], navigationExtras);
  }
}
