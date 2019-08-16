import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ControlsService } from './controls.service';
import { DynamicControlsService } from './dynamic-controls.service';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../sharedModule';

@NgModule({
  imports: [IonicModule, ReactiveFormsModule, CommonModule, SharedModule],
  providers: [DynamicControlsService, ControlsService],
  declarations: [DynamicFormComponent],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule {

}