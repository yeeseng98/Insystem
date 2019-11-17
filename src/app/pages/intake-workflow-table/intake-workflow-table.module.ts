import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IntakeWorkflowTablePage } from './intake-workflow-table.page';

const routes: Routes = [
  {
    path: '',
    component: IntakeWorkflowTablePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IntakeWorkflowTablePage]
})
export class IntakeWorkflowTablePageModule {}
