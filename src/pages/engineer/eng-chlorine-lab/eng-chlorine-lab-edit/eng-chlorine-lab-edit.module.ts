import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngChlorineLabEditPage } from './eng-chlorine-lab-edit';

@NgModule({
  declarations: [
    EngChlorineLabEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngChlorineLabEditPage),
  ],
  exports: [
    EngChlorineLabEditPage
  ]
})
export class EngChlorineLabEditPageModule {}
