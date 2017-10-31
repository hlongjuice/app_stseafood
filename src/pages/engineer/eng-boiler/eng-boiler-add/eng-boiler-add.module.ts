import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngBoilerAddPage } from './eng-boiler-add';

@NgModule({
  declarations: [
    EngBoilerAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngBoilerAddPage),
  ],
  exports: [
    EngBoilerAddPage
  ]
})
export class EngBoilerAddPageModule {}
