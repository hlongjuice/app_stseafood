import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngColdStoragePage } from './eng-cold-storage';

@NgModule({
  declarations: [
    EngColdStoragePage,
  ],
  imports: [
    IonicPageModule.forChild(EngColdStoragePage),
  ],
  exports: [
    EngColdStoragePage
  ]
})
export class EngColdStoragePageModule {}
