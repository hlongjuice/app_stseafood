import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdExpirationEditPage } from './pd-expiration-edit';

@NgModule({
  declarations: [
    PdExpirationEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PdExpirationEditPage),
  ],
  exports: [
    PdExpirationEditPage
  ]
})
export class PdExpirationEditPageModule {}
