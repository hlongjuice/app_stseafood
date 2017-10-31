import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionEmployeePage } from './production-employee';

@NgModule({
  declarations: [
    ProductionEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionEmployeePage),
  ],
  exports: [
    ProductionEmployeePage
  ]
})
export class ProductionEmployeePageModule {}
