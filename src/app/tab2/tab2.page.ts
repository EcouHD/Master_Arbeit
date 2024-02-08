import { Component } from '@angular/core';
declare var webgazer: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  startWebgazer() {
    webgazer.begin();
  }

  showTutorial() {
    
  }

  deleteLocalData() {
    console.log("deleteLocalData() is called!")
  }

  showInformation() {

  }
}
