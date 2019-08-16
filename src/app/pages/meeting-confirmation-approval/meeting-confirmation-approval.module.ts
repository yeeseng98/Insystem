import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeetingConfirmationApprovalPage } from './meeting-confirmation-approval.page';

const routes: Routes = [
  {
    path: '',
    component: MeetingConfirmationApprovalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeetingConfirmationApprovalPage]
})
export class MeetingConfirmationApprovalPageModule {}
