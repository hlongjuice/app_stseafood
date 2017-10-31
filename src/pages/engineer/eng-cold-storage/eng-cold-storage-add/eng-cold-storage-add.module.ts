import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngColdStorageAddPage } from './eng-cold-storage-add';

@NgModule({
  declarations: [
    EngColdStorageAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngColdStorageAddPage),
  ],
  exports: [
    EngColdStorageAddPage
  ]
})
export class EngColdStorageAddPageModule {}
