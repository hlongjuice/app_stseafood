import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionWorkFormPage } from './production-work-form';

@NgModule({
  declarations: [
    ProductionWorkFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionWorkFormPage),
  ],
  exports: [
    ProductionWorkFormPage
  ]
})
export class ProductionWorkFormPageModule {}
