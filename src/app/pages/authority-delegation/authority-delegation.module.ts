import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthorityDelegationPage } from './authority-delegation.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorityDelegationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthorityDelegationPage]
})
export class AuthorityDelegationPageModule {}
