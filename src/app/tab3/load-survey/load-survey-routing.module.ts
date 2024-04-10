import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadSurveyPage } from './load-survey.page';

const routes: Routes = [
  {
    path: '',
    component: LoadSurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadSurveyPageRoutingModule {}
