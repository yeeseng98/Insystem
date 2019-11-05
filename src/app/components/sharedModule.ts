import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FileUploadComponent } from './formItems/app-file-upload.component';
import { ProgressComponent } from './formItems/progress.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule
    ],
    declarations: [
        FileUploadComponent,
        ProgressComponent
    ],
    exports: [
        FileUploadComponent,
        ProgressComponent
    ]
})
export class SharedModule {}