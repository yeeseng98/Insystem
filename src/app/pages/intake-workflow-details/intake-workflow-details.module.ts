import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IntakeWorkflowDetailsPage } from './intake-workflow-details.page';

const routes: Routes = [
  {
    path: '',
    component: IntakeWorkflowDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IntakeWorkflowDetailsPage]
})
export class IntakeWorkflowDetailsPageModule {}
