import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdBuildListPage } from './pd-build-list';

@NgModule({
  declarations: [
    PdBuildListPage,
  ],
  imports: [
    IonicPageModule.forChild(PdBuildListPage),
  ],
  exports: [
    PdBuildListPage
  ]
})
export class PdBuildListPageModule {}
