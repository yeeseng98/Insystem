import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('task') task: any;

  constructor(public toastCtrl: ToastController) {}

  ngOnInit(): void {
  }

  async selectTask(task) {
    const toast = await this.toastCtrl.create({
      message: 'Selected: ${task.name}'
    });
    toast.present();
  }

}
