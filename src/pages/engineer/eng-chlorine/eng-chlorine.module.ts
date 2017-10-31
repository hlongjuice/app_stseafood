import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngChlorinePage } from './eng-chlorine';

@NgModule({
  declarations: [
    EngChlorinePage,
  ],
  imports: [
    IonicPageModule.forChild(EngChlorinePage),
  ],
  exports: [
    EngChlorinePage
  ]
})
export class EngChlorinePageModule {}
