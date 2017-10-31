import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngColdStorageResultPage } from './eng-cold-storage-result';

@NgModule({
  declarations: [
    EngColdStorageResultPage,
  ],
  imports: [
    IonicPageModule.forChild(EngColdStorageResultPage),
  ],
  exports: [
    EngColdStorageResultPage
  ]
})
export class EngColdStorageResultPageModule {}
