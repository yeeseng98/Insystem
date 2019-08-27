import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddResourcePage } from './add-resource.page';
import { SharedModule } from 'src/common/sharedModule';

const routes: Routes = [
  {
    path: '',
    component: AddResourcePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddResourcePage]
})
export class AddResourcePageModule {}
