import { Component } from '@angular/core';
import { GlobalVariablesService } from '../global-variables.service';
declare var webgazer: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  globalVariablesService: GlobalVariablesService

  constructor(globalVariablesService: GlobalVariablesService) {
    this.globalVariablesService = globalVariablesService
  }

  startWebgazer() {
    webgazer.begin();
  }

  showTutorial() {
    
  }

  deleteLocalData() {
    console.log("deleteLocalData() is called!")
    webgazer.clearData()
    this.globalVariablesService.infoLabel = "Currently not calibrated. Continue with calibration."
    
  }

  showInformation() {

  }
}
