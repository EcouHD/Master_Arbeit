import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from './http.service';
import { GlobalVariablesService } from './global-variables.service';
import { WebgazerService } from './webgazer.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private navController: NavController, private httpService: HttpService, private globalVariablesService: GlobalVariablesService, private webgazerService: WebgazerService) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log("Handler called!");
      navController.back();
    });

    let myuuid = localStorage.getItem('uuid');

    if (!myuuid) {
      myuuid = uuidv4();
      localStorage.setItem('uuid', myuuid);
    }

    console.log(myuuid)
    this.httpService.setUserData(myuuid).subscribe(
      response => {
        console.log(response)
        if (myuuid != null) {
          this.globalVariablesService.uuid = myuuid
        }
      }
    )



    console.log("height: " + window.innerHeight + " width: " + window.innerWidth);

    window.onload = async function () {
      await webgazerService.begin()

      await webgazerService.pause()
    }
  }

}
