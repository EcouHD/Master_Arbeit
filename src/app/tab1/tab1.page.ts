import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { GlobalVariablesService } from '../global-variables.service';

declare var webgazer: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  globalVariablesService: GlobalVariablesService

  constructor(globalVariablesService: GlobalVariablesService) {
    this.globalVariablesService = globalVariablesService
  }

  startCalibration() {
    
  }

  deleteCalibration() {
      console.log("deleteCalibration() method run")
      webgazer.clearData()
      this.globalVariablesService.infoLabel = "Currently not calibrated. Continue with calibration."
  }

}
