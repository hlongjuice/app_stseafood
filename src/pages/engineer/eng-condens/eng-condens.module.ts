import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngCondensPage } from './eng-condens';

@NgModule({
  declarations: [
    EngCondensPage,
  ],
  imports: [
    IonicPageModule.forChild(EngCondensPage),
  ],
  exports: [
    EngCondensPage
  ]
})
export class EngCondensPageModule {}
