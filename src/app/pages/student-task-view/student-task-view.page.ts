import { Component, OnInit } from '@angular/core';
import { TaskConfigService } from 'src/app/services/taskConfig/task-config.service';
import { PhaseInfo } from 'src/app/models/phaseInfo';

@Component({
  selector: 'app-student-task-view',
  templateUrl: './student-task-view.page.html',
  styleUrls: ['./student-task-view.page.scss'],
})
export class StudentTaskViewPage {

  tasks: any[] = [];
  automaticClose = false;

  constructor(public taskConfigService: TaskConfigService) {

    taskConfigService.getIntakeTasks('NP1F1609BM').map(res => res.json())
      .subscribe(response => {
        const json_data = JSON.parse(JSON.stringify(response));

        const phaseArray: PhaseInfo[] = [];
        let phaseDates: any[] = [];

        json_data.forEach((phase) => {
          const phaseobj = {
            phaseName: phase.phaseName,
            phaseNum: phase.phaseOrder,
            phaseDur: phase.phaseDuration,
            phaseId: phase.phaseID,
            isLocked: true,
            startDate: '',
            endDate: ''
          };

          if (!this.containsObject(phaseobj, phaseArray)) {
            phaseArray.push(phaseobj);
          }
        });

        taskConfigService.getIntakePhaseDates('NP1F1609BM').map(res => res.json())
          .subscribe(response => {
            phaseDates = response;

            const now = new Date();
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < phaseDates.length; i++) {
              // tslint:disable-next-line: prefer-for-of
              for (let j = 0; j < phaseArray.length; j++ ) {
                if (phaseDates[i].phaseID === phaseArray[j].phaseId) {

                  if (now.getTime() >= new Date(phaseDates[i].startDate).getTime() &&
                    now.getTime() <= new Date(phaseDates[i].endDate).getTime()) {
                    phaseArray[j].isLocked = false;
                  }
                  console.log(phaseDates[i].startDate);
                  phaseArray[j].startDate = phaseDates[i].startDate;
                  phaseArray[j].endDate = phaseDates[i].endDate;
                  break;
                }
              }
            }

            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < phaseArray.length; i++) {

              const obj = {};

              obj['phaseName'] = phaseArray[i].phaseName;
              obj['phaseNum'] = phaseArray[i].phaseNum;
              obj['phaseDur'] = phaseArray[i].phaseDur;
              obj['phaseId'] = phaseArray[i].phaseId;
              obj['isLocked'] = phaseArray[i].isLocked;
              obj['startDate'] = phaseArray[i].startDate;
              obj['endDate'] = phaseArray[i].endDate;
              obj['children'] = [];

              json_data.forEach((element) => {
                if (phaseArray[i].phaseNum === element.phaseOrder) {
                  let ele = {
                    taskName: element.taskName,
                    desc: element.desc,
                    type: element.taskType,
                    formId: element.formID,
                    taskId: element.taskID,
                    isLocked: phaseArray[i].isLocked
                  };
                  obj['children'].push(ele);
                }
              });

              console.log(obj);
              this.tasks[i] = obj;
            }

            this.tasks[0].open = true;

          });
      });

  }

  toggleSelection(i) {
    this.tasks[i].open = !this.tasks[i].open;

    if (this.automaticClose && this.tasks[i].open) {
      this.tasks
        .filter((item, itemIndex) => itemIndex !== i)
        .map(item => item.open = false);
    }
  }

  toggleItem(i, j) {
    this.tasks[i].children[j].open = !this.tasks[i].children[j].open;
  }

  containsObject(obj: PhaseInfo, list: PhaseInfo[]) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < list.length; i++) {
      if (list[i].phaseNum === obj.phaseNum) {
        return true;
      }
    }

    return false;
  }
}
