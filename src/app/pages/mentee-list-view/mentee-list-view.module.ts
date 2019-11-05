import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenteeListViewPage } from './mentee-list-view.page';

const routes: Routes = [
  {
    path: '',
    component: MenteeListViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenteeListViewPage]
})
export class MenteeListViewPageModule {}
