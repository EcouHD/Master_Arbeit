import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalVariablesService } from '../global-variables.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  globalVariablesService: GlobalVariablesService;

  constructor(globalVariablesService: GlobalVariablesService) {
    this.globalVariablesService = globalVariablesService
  }

  loadSurvey() {

  }

  startSurvey() {

  }

}
