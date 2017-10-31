import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdExpirationPage } from './pd-expiration';

@NgModule({
  declarations: [
    PdExpirationPage,
  ],
  imports: [
    IonicPageModule.forChild(PdExpirationPage),
  ],
  exports: [
    PdExpirationPage
  ]
})
export class PdExpirationPageModule {}
