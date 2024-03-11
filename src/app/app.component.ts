import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

declare var webgazer: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private navController: NavController) {
    this.platform.backButton.subscribeWithPriority(10, ()=> {
      console.log("Handler called!");
      navController.back();
    });
    

    console.log("height: " + window.innerHeight + " width: " + window.innerWidth);

    window.onload = async function() {
      await webgazer.setRegression('weightedRidge')
      .saveDataAcrossSessions(true)
      .showVideo(false)
      .begin();

      await webgazer.pause()
    }
  }

}
