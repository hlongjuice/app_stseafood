import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdExpirationAddPage } from './pd-expiration-add';

@NgModule({
  declarations: [
    PdExpirationAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PdExpirationAddPage),
  ],
  exports: [
    PdExpirationAddPage
  ]
})
export class PdExpirationAddPageModule {}
