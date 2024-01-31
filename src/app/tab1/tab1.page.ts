import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private platform: Platform, private navController: NavController) {
    this.platform.backButton.subscribeWithPriority(10, ()=> {
      console.log("Handler called!");
      navController.back();
    });
  }

  startCalibration() {
    
  }

  deleteCalibration() {

  }

}
