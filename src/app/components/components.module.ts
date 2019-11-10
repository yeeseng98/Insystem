import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner';
import { MessageWithSvgComponent } from './message-with-svg/message-with-svg.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    MessageWithSvgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    LoadingSpinnerComponent,
    MessageWithSvgComponent
  ],
  entryComponents: [
  ]
})
export class ComponentsModule { }
