import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngChlorineAddPage } from './eng-chlorine-add';

@NgModule({
  declarations: [
    EngChlorineAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngChlorineAddPage),
  ],
  exports: [
    EngChlorineAddPage
  ]
})
export class EngChlorineAddPageModule {}
