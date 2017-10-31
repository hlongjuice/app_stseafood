import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestEmployeeListPage } from './request-employee-list';

@NgModule({
  declarations: [
    RequestEmployeeListPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestEmployeeListPage),
  ],
  exports: [
    RequestEmployeeListPage
  ]
})
export class RequestEmployeeListPageModule {}
