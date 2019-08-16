import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { IntakeConfigService } from 'src/app/services/intakeConfig/intake-config.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-assign-workflow',
  templateUrl: './assign-workflow.page.html',
  styleUrls: ['./assign-workflow.page.scss'],
})
export class AssignWorkflowPage {

  intakes: any = [];
  allIntakes: any = [];
  searchQuery = '';
  searching: any = false;

  constructor(private router: Router, private _FB: FormBuilder, private intakeConfigService: IntakeConfigService) {

    this.intakeConfigService.getIntakeList().subscribe(response => {
      let json_data = JSON.parse(JSON.stringify(response));

      json_data.forEach((element) => {
        this.intakes.push(element);
        this.allIntakes.push(element);
      });
    });
  }

  initializeItems() {
    this.intakes = this.allIntakes;
  }

  onSearchInput(event) {
    this.searching = true;
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = event.target.value;
    console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.intakes = this.intakes.filter((item) => {
        return (item.INTAKE_CODE.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }

    this.searching = false;
  }

  selectIntake(intake) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        intakeId: intake.INTAKE_CODE
      }
    };
    this.router.navigate(['workflow-selection'], navigationExtras);
  }
}
