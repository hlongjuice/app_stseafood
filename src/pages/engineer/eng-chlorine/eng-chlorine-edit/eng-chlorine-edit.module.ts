import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngChlorineEditPage } from './eng-chlorine-edit';

@NgModule({
  declarations: [
    EngChlorineEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngChlorineEditPage),
  ],
  exports: [
    EngChlorineEditPage
  ]
})
export class EngChlorineEditPageModule {}
