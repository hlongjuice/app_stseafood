import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditResponsePage } from './edit-response';

@NgModule({
  declarations: [
    EditResponsePage,
  ],
  imports: [
    IonicPageModule.forChild(EditResponsePage),
  ],
  exports: [
    EditResponsePage
  ]
})
export class EditResponsePageModule {}
