import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionSettingPage } from './production-setting';

@NgModule({
  declarations: [
    ProductionSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionSettingPage),
  ],
  exports: [
    ProductionSettingPage
  ]
})
export class ProductionSettingPageModule {}
