import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngResultsPage } from './eng-results';

@NgModule({
  declarations: [
    EngResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(EngResultsPage),
  ],
  exports: [
    EngResultsPage
  ]
})
export class EngResultsPageModule {}
