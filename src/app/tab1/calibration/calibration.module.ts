import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalibrationPageRoutingModule } from './calibration-routing.module';

import { CalibrationPage } from './calibration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalibrationPageRoutingModule
  ],
  declarations: [CalibrationPage]
})
export class CalibrationPageModule {}
