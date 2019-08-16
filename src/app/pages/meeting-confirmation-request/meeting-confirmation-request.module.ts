import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeetingConfirmationRequestPage } from './meeting-confirmation-request.page';

const routes: Routes = [
  {
    path: '',
    component: MeetingConfirmationRequestPage
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
  declarations: [MeetingConfirmationRequestPage]
})
export class MeetingConfirmationRequestPageModule {}
