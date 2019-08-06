import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ControlsService } from './controls.service';
import { DynamicControlsService } from './dynamic-controls.service';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProgressComponent } from './progress.component';
import { FileUploadComponent } from './app-file-upload.component';

@NgModule({
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  providers: [DynamicControlsService, ControlsService],
  declarations: [DynamicFormComponent, ProgressComponent, FileUploadComponent],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule {

}