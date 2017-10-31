import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionResultDetailsPage } from './production-result-details';

@NgModule({
  declarations: [
    ProductionResultDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionResultDetailsPage),
  ],
  exports: [
    ProductionResultDetailsPage
  ]
})
export class ProductionResultDetailsPageModule {}
