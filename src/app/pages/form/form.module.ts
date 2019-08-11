import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DynamicFormModule } from '../../../common/formItems/dynamic-form.module';
import { FormPage } from './form.page';
import { FormConfigService } from '../../services/formConfig/form-config.service';

const routes: Routes = [
  {
    path: '',
    component: FormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicFormModule,
    RouterModule.forChild(routes)
  ],
  providers: [FormConfigService],
  declarations: [FormPage]
})
export class FormPageModule {}
