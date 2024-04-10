import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadSurveyPageRoutingModule } from './load-survey-routing.module';

import { LoadSurveyPage } from './load-survey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadSurveyPageRoutingModule
  ],
  declarations: [LoadSurveyPage]
})
export class LoadSurveyPageModule {}
