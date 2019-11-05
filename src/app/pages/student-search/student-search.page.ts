import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { StudentConfigService } from 'src/app/services/studentConfig/student-config.service';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.page.html',
  styleUrls: ['./student-search.page.scss'],
})
export class StudentSearchPage implements OnInit {

  public hasSearched = false;
  public requestExtend = false;
  public hasDate = false;

  TPField: string;
  extendDur: number;
  newEndDate: string;

  tpNum: string;
  name: string;
  intake: string;
  intStatus: string;
  workflowId: string;
  startDate: string;
  endDate: string;
  companyName: string;
  extensionDate: string;
  declarationDate: string;

  constructor(private datePipe: DatePipe, private menuCtrl: MenuController,
              private sConfig: StudentConfigService, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  search() {
    this.sConfig.getStudent(this.TPField).map(res => res.json()).subscribe(res => {
      const json_data = JSON.parse(JSON.stringify(res));

      if (json_data.length > 0) {
        console.log(json_data);
        json_data.forEach(element => {
          this.tpNum = element.studentID;
          this.name = element.studentName;
          this.intStatus = element.internshipStatus;
          this.intake = element.intake;
          this.workflowId = this.nullable(element.workflowID);
          this.startDate = this.nullable(element.startDate);
          this.endDate = this.nullable(element.endDate);
          this.companyName = this.nullable(element.companyName);
          this.extensionDate = this.nullable(element.extensionDate);
          this.declarationDate = element.dateSigned;
        });

        this.hasSearched = true;
      } else {
        this.generateAlert('The student associated with this ID does not exist or has not registered into the system yet!');
      }
    });
  }

  showExtension() {
    this.requestExtend = true;
  }

  extend(stdId: string) {
    console.log(this.extendDur);
    if (this.extendDur > 0) {
      let alert = this.alertCtrl.create({
        // tslint:disable-next-line: max-line-length
        subHeader: 'IMPORTANT: This student will gain access to all tasks in the workflow after extension. Graded deliverables will not be remarked!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Confirm',
            handler: data => {
              
            }
          }
        ]
      }).then(alert => alert.present());
    } else {
      this.generateAlert('Extension must be greater than 0 days');
    }
  }

  calEndDate() {
    this.hasDate = true;
    const converted = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    const selectedDate = new Date(converted);
    selectedDate.setDate(selectedDate.getDate() + this.extendDur);
    this.newEndDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
  }

  nullable(val: any) {
    if (val) {
      return val;
    } else {
      return 'None';
    }
  }

  generateAlert(response) {
    const alert = this.alertCtrl.create({
      message: response,
      buttons: ['Dismiss']
    }).then(alert => alert.present());

    return alert;
  }
}
