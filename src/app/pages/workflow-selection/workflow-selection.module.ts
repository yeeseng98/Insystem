import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { WorkflowSelectionPage } from './workflow-selection.page';

const routes: Routes = [
  {
    path: '',
    component: WorkflowSelectionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe],
  declarations: [WorkflowSelectionPage]
})
export class WorkflowSelectionPageModule {}
