import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalibrationPage } from './calibration.page';

const routes: Routes = [
  {
    path: '',
    component: CalibrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalibrationPageRoutingModule {}
