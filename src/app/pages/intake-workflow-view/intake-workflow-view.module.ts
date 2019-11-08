import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IntakeWorkflowViewPage } from './intake-workflow-view.page';

const routes: Routes = [
  {
    path: '',
    component: IntakeWorkflowViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IntakeWorkflowViewPage]
})
export class IntakeWorkflowViewPageModule {}
