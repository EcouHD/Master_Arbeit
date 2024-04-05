import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http.service';

declare var webgazer: any;
var gazeData: Array<any> = [];

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  navController: NavController;
  httpService: HttpService;

  constructor(navController: NavController, httpService: HttpService) {
    this.navController = navController
    this.httpService = httpService

    webgazer.setGazeListener((data: any, clock: any) => {
      if (data == null) {
        return;
      }
      webgazer.util.bound(data);
      gazeData.push(data)

    }).resume()
  }

  ngOnInit() {
  }

  goBack() {
    this.navController.back();
  }

  goToPreviousPage() {
    // recover the correct question id that the database changes to the correct result!
    // reset gazeData array
    // we have to ensure that the next button handles the case of resending information!
  }
  goToNextPage() {
    // the answer with the gazedata should be send to the server that it can handle the data
    // and put it in the database. Reset gazeData array for next question.
    // Consider resending of information on same question_id!
  }

}
