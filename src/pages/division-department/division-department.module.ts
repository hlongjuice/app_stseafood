import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DivisionDepartmentPage } from './division-department';

@NgModule({
  declarations: [
    DivisionDepartmentPage,
  ],
  imports: [
    IonicPageModule.forChild(DivisionDepartmentPage),
  ],
  exports: [
    DivisionDepartmentPage
  ]
})
export class DivisionDepartmentPageModule {}
