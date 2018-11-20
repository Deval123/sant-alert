import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaladieChroniquePage } from './maladie-chronique';

@NgModule({
  declarations: [
    MaladieChroniquePage,
  ],
  imports: [
    IonicPageModule.forChild(MaladieChroniquePage),
  ],
})
export class MaladieChroniquePageModule {}
