import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngChlorineLabAddPage } from './eng-chlorine-lab-add';

@NgModule({
  declarations: [
    EngChlorineLabAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngChlorineLabAddPage),
  ],
  exports: [
    EngChlorineLabAddPage
  ]
})
export class EngChlorineLabAddPageModule {}
