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

        json_data.forEach((phase) => {
          const phaseobj = {
            phaseName: phase.phaseName,
            phaseNum: phase.phaseOrder,
            phaseDur: phase.phaseDuration,
          };

          if (!this.containsObject(phaseobj, phaseArray)) {
            phaseArray.push(phaseobj);
          }
        });

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < phaseArray.length; i++) {

          const obj = {};

          obj['phaseName'] = phaseArray[i].phaseName;
          obj['phaseNum'] = phaseArray[i].phaseNum;
          obj['phaseDur'] = phaseArray[i].phaseDur;
          obj['children'] = [];

          json_data.forEach((element) => {
            if (phaseArray[i].phaseNum === element.phaseOrder) {
              let ele = {
                taskName: element.taskName,
                desc: element.desc
              };
              obj['children'].push(ele);
            }
          });

          console.log(obj);
          this.tasks[i] = obj;
        }
        this.tasks[0].open = true;

        console.log(this.tasks);
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
