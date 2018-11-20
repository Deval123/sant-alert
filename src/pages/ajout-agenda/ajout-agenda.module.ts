import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutAgendaPage } from './ajout-agenda';

@NgModule({
  declarations: [
    AjoutAgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutAgendaPage),
  ],
})
export class AjoutAgendaPageModule {}
