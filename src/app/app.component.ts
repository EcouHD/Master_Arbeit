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
      await webgazer.setRegression('ridge')
      .setGazeListener(function(data: any, clock: any) {
        if(data == null) {
          return;
        }
        webgazer.util.bound(data);
        console.log("exact points x: " + data.x + " y: " + data.y);
      })
      .saveDataAcrossSessions(true)
      .begin().pause();
    }
  }

}
