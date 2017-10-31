import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngCondensAddPage } from './eng-condens-add';

@NgModule({
  declarations: [
    EngCondensAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EngCondensAddPage),
  ],
  exports: [
    EngCondensAddPage
  ]
})
export class EngCondensAddPageModule {}
