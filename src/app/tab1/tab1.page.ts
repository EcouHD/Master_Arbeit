import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

declare var webgazer: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() { }

  startCalibration() {
    
  }

  deleteCalibration() {
      console.log("deleteCalibration() method run")
      webgazer.showVideo(false);
      webgazer.pause();
  }

}
