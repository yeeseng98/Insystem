import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TaskConfigService } from 'src/app/services/taskConfig/task-config.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('task') task: any;

  constructor(public router: Router, public toastCtrl: ToastController, public taskConfigService: TaskConfigService) { }

  ngOnInit(): void {
  }

  async selectTask(task) {
    if (task.type === 'form') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          taskId: task.taskId,
          formId: task.formId,
          studentId: 'TP041800',
        }
      };
      this.taskConfigService.changeLock(task.isLocked);
      this.router.navigate(['form'], navigationExtras);
    } else if (task.type === 'file') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          taskId: task.taskId,
          studentId: 'TP041800'
        }
      };
      this.taskConfigService.changeLock(task.isLocked);
      this.router.navigate(['file'], navigationExtras);
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Sorry, the selected task could not be fetched. Please contact the administrator for details.'
      });
      toast.present();
    }
  }

}
