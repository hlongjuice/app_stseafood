import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionResultPage } from './production-result';

@NgModule({
  declarations: [
    ProductionResultPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionResultPage),
  ],
  exports: [
    ProductionResultPage
  ]
})
export class ProductionResultPageModule {}
