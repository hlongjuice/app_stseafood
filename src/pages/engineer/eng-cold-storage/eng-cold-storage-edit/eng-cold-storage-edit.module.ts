import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngColdStorageEditPage } from './eng-cold-storage-edit';

@NgModule({
  declarations: [
    EngColdStorageEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngColdStorageEditPage),
  ],
  exports: [
    EngColdStorageEditPage
  ]
})
export class EngColdStorageEditPageModule {}
