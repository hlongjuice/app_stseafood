import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngCondensEditPage } from './eng-condens-edit';

@NgModule({
  declarations: [
    EngCondensEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EngCondensEditPage),
  ],
  exports: [
    EngCondensEditPage
  ]
})
export class EngCondensEditPageModule {}
