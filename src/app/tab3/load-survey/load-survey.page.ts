import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { environment } from 'src/environments/environment';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-load-survey',
  templateUrl: './load-survey.page.html',
  styleUrls: ['./load-survey.page.scss'],
})
export class LoadSurveyPage implements OnInit {
  navController: NavController
  httpService: HttpService
  globalVariablesService: GlobalVariablesService

  names: string[] = []

  constructor(navController: NavController, httpService: HttpService, globalVariablesService: GlobalVariablesService) {
    this.navController = navController
    this.httpService = httpService
    this.globalVariablesService = globalVariablesService
  }

  ngOnInit() {
    this.httpService.getSurveyNames().subscribe(
      (response) => { this.names = response.map((item) => item.name) },
      (error) => { console.error(error) }
    )
  }

  goBack() {
    this.navController.back()
  }

  startSurvey(name: string) {
    this.globalVariablesService.selectedSurveyName = name;
    console.log("Survey clicked with name: " + name)
  }

}
