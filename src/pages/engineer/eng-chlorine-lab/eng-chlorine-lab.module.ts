import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngChlorineLabPage } from './eng-chlorine-lab';

@NgModule({
  declarations: [
    EngChlorineLabPage,
  ],
  imports: [
    IonicPageModule.forChild(EngChlorineLabPage),
  ],
  exports: [
    EngChlorineLabPage
  ]
})
export class EngChlorineLabPageModule {}
