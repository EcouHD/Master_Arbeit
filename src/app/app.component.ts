import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from './http.service';
import { GlobalVariablesService } from './global-variables.service';

declare var webgazer: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private navController: NavController, private httpService: HttpService, private globalVariablesService: GlobalVariablesService) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log("Handler called!");
      navController.back();
    });

    let myuuid = uuidv4();
    console.log(myuuid)
    this.httpService.setUserData(myuuid).subscribe(
      response => {
        console.log(response)
        this.globalVariablesService.uuid = myuuid
      }
    )



    console.log("height: " + window.innerHeight + " width: " + window.innerWidth);

    window.onload = async function () {
      await webgazer.setRegression('weightedRidge')
        .saveDataAcrossSessions(true)
        .showVideo(false)
        .begin();

      await webgazer.pause()
    }
  }

}
