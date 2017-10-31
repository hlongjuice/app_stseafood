import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngBoilerEditPage } from './eng-boiler-edit';

@NgModule({
  declarations: [
    EngBoilerEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngBoilerEditPage),
  ],
  exports: [
    EngBoilerEditPage
  ]
})
export class EngBoilerEditPageModule {}
