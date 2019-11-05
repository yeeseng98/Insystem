import { Component, OnInit } from '@angular/core';
import { TaskConfigService } from 'src/app/services/taskConfig/task-config.service';
import { PhaseInfo } from 'src/app/interfaces/phaseInfo';
import { ControlsService } from 'src/app/components/formItems/controls.service';
import { MenuController } from '@ionic/angular';
import { StudentConfigService } from 'src/app/services/studentConfig/student-config.service';
import { WsApiService } from 'src/app/services/wsApiService/ws-api.service';
import { Observable } from 'rxjs';
import { StudentProfile } from 'src/app/interfaces/student-profile';

@Component({
  selector: 'app-student-task-view',
  templateUrl: './student-task-view.page.html',
  styleUrls: ['./student-task-view.page.scss'],
})
export class StudentTaskViewPage {

  public extendedDate;
  profile$: Observable<StudentProfile>;

  tasks: any[] = [];
  automaticClose = false;
  isExtended = false;

  constructor(public taskConfigService: TaskConfigService, menuCtrl: MenuController,
              private sConfig: StudentConfigService, private ws: WsApiService) {

    menuCtrl.enable(true);

    this.profile$ = this.ws.get<StudentProfile>('/student/profile');

    this.profile$.subscribe(std => {
      // check whether student is extended
      sConfig.getStudent(std.STUDENT_NUMBER).map(res => res.json()).subscribe(info => {

        const std_data = JSON.parse(JSON.stringify(info));
        console.log(std_data);
        std_data.forEach(stdInfo => {
          if (stdInfo.isExtended === 'Y') {
            this.isExtended = true;
            this.extendedDate = stdInfo.extensionDate;
          }
        });

        // get the workflow of the intake
        taskConfigService.getIntakeTasks(std.INTAKE).map(res => res.json())
          .subscribe(response => {
            const json_data = JSON.parse(JSON.stringify(response));

            const phaseArray: PhaseInfo[] = [];
            let phaseDates: any[] = [];
            let submittedTasks: any[] = [];

            // get the student's submitted tasks
            taskConfigService.getTaskStatus(std.STUDENT_NUMBER).map(res => res.json())
              .subscribe(subbedTaskList => {
                const json_tasks = JSON.parse(JSON.stringify(subbedTaskList));
                json_tasks.forEach((task) => {
                  submittedTasks.push(task.taskID);
                });

                json_data.forEach((phase) => {
                  const phaseobj = {
                    phaseName: phase.phaseName,
                    phaseNum: phase.phaseOrder,
                    phaseDur: phase.phaseDuration,
                    phaseId: phase.phaseID,
                    isLocked: true,
                    startDate: '',
                    endDate: '',
                  };

                  if (!this.containsObject(phaseobj, phaseArray)) {
                    phaseArray.push(phaseobj);
                  }
                });

                // set up phases and their date periods
                taskConfigService.getIntakePhaseDates(std.INTAKE).map(res => res.json())
                  .subscribe(response => {
                    phaseDates = response;

                    // checks the periods of each phase and locks them accordingly.
                    // if the extended date exists, the phases are all unlocked.
                    const now = new Date();

                    if (this.isExtended) {
                      console.log('not');
                      // tslint:disable-next-line: prefer-for-of
                      for (let i = 0; i < phaseDates.length; i++) {
                        // tslint:disable-next-line: prefer-for-of
                        for (let j = 0; j < phaseArray.length; j++) {
                          if (phaseDates[i].phaseID === phaseArray[j].phaseId) {

                            if (now.getTime() <= new Date(this.extendedDate).getTime()) {
                              phaseArray[j].isLocked = false;
                            }

                            phaseArray[j].startDate = phaseDates[i].startDate;
                            phaseArray[j].endDate = phaseDates[i].endDate;
                            break;
                          }
                        }
                      }
                    } else {
                      console.log('yes');

                      // tslint:disable-next-line: prefer-for-of
                      for (let i = 0; i < phaseDates.length; i++) {
                        // tslint:disable-next-line: prefer-for-of
                        for (let j = 0; j < phaseArray.length; j++) {
                          if (phaseDates[i].phaseID === phaseArray[j].phaseId) {

                            if (now.getTime() >= new Date(phaseDates[i].startDate).getTime() &&
                              now.getTime() <= new Date(phaseDates[i].endDate).getTime()) {
                              phaseArray[j].isLocked = false;
                            }

                            phaseArray[j].startDate = phaseDates[i].startDate;
                            phaseArray[j].endDate = phaseDates[i].endDate;
                            break;
                          }
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

                      // checks for task submission status and push tasks into phases
                      json_data.forEach((element) => {
                        if (phaseArray[i].phaseNum === element.phaseOrder) {
                          if (submittedTasks.includes(element.taskID)) {
                            let ele = {
                              taskName: element.taskName,
                              desc: element.desc,
                              type: element.taskType,
                              formId: element.formID,
                              taskId: element.taskID,
                              isLocked: phaseArray[i].isLocked,
                              isSubmitted: true
                            };
                            obj['children'].push(ele);
                          } else {
                            let ele = {
                              taskName: element.taskName,
                              desc: element.desc,
                              type: element.taskType,
                              formId: element.formID,
                              taskId: element.taskID,
                              isLocked: phaseArray[i].isLocked,
                              isSubmitted: false
                            };
                            obj['children'].push(ele);
                          }
                        }
                      });

                      this.tasks[i] = obj;
                    }

                    this.tasks[0].open = true;
                  });
              });
          });
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
