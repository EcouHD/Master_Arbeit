import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { Survey } from 'src/app/survey';
import { Question } from 'src/app/question'

declare var webgazer: any;
var gazeData: Array<any> = [];

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  navController: NavController
  httpService: HttpService
  globalVariablesService: GlobalVariablesService
 
  selectedAnswer = "3" //defaut value = Neutral
  currentQuestion = "This is the default question if none is loaded from the database or an error occured!"

  indexQuestions = 0
  listOfQuestionsArr: Question[] = []
  currentSurvey: Survey = {
    survey_id: 0,
    name: '',
    list_of_questions: ''
  }

  constructor(navController: NavController, httpService: HttpService, globalVariablesService: GlobalVariablesService) {
    this.navController = navController
    this.httpService = httpService
    this.globalVariablesService = globalVariablesService

    webgazer.setGazeListener((data: any, clock: any) => {
      if (data == null) {
        return;
      }
      webgazer.util.bound(data);
      gazeData.push(data)

    }).resume()
  }

  ngOnInit() {
    this.httpService.getSurveyWithName(this.globalVariablesService.selectedSurveyName).subscribe(
      survey => {
        console.log(survey)
        this.currentSurvey = survey[0]
        this.listOfQuestionsArr = JSON.parse(this.currentSurvey.list_of_questions)
        this.currentQuestion = this.listOfQuestionsArr[this.indexQuestions].question
      }
    )
  }

  goBack() {
    this.navController.back();
  }

  goToPreviousPage() {
    // recover the correct question id that the database changes to the correct result!
    // reset gazeData array
    // we have to ensure that the next button handles the case of resending information!
    if ((this.indexQuestions - 1) > -1) {
      this.indexQuestions--
      this.currentQuestion = this.listOfQuestionsArr[this.indexQuestions].question
      // recover previous ticked answer?
    }
  }
  goToNextPage() {
    // the answer with the gazedata should be send to the server that it can handle the data
    // and put it in the database. Reset gazeData array for next question.
    // Consider resending of information on same question_id!
    if ((this.indexQuestions + 1 < this.listOfQuestionsArr.length)) {
      this.indexQuestions++
      this.currentQuestion = this.listOfQuestionsArr[this.indexQuestions].question
      // send data
    }
  }

}
