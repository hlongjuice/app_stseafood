import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupDivisionDepartmentPage } from './popup-division-department';

@NgModule({
  declarations: [
    PopupDivisionDepartmentPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupDivisionDepartmentPage),
  ],
  exports: [
    PopupDivisionDepartmentPage
  ]
})
export class PopupDivisionDepartmentPageModule {}
