import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentSearchPage } from './student-search.page';

const routes: Routes = [
  {
    path: '',
    component: StudentSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe],
  declarations: [StudentSearchPage]
})
export class StudentSearchPageModule {}
