import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngBoilerPage } from './eng-boiler';

@NgModule({
  declarations: [
    EngBoilerPage,
  ],
  imports: [
    IonicPageModule.forChild(EngBoilerPage),
  ],
  exports: [
    EngBoilerPage
  ]
})
export class EngBoilerPageModule {}
