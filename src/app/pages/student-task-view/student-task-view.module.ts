import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpandableComponent } from '../../components/expandable/expandable.component';
import { StudentTaskViewPage } from './student-task-view.page';

const routes: Routes = [
  {
    path: '',
    component: StudentTaskViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentTaskViewPage, ExpandableComponent]
})
export class StudentTaskViewPageModule {}
