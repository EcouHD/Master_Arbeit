import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { Survey } from 'src/app/survey';
import { Question } from 'src/app/question'

declare var webgazer: any;
var gazeData: any[] = [];

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  navController: NavController
  httpService: HttpService
  globalVariablesService: GlobalVariablesService

  @ViewChild('radio1') radio1!: ElementRef

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


    const debouncedFunction = this.debounce(() => {
        this.resize()
    }, 300);

    window.addEventListener('resize', debouncedFunction, false);

    webgazer.setGazeListener((data: any, clock: any) => {
      if (data == null) {
        return;
      }
      webgazer.util.bound(data);
      gazeData.push(data)

    }).resume()
  }

  ngAfterViewInit() {
    // force one resize function for giving information to database
    setTimeout(this.resize.bind(this), 1000)
  }

  ngOnInit() {
    gazeData = []
    this.httpService.getSurveyWithName(this.globalVariablesService.selectedSurveyName).subscribe(
      survey => {
        console.log(survey)
        this.currentSurvey = survey[0]
        this.listOfQuestionsArr = JSON.parse(this.currentSurvey.list_of_questions) // do we have to sort it?
        this.globalVariablesService.selectedSurvey_id = this.currentSurvey.survey_id
        this.currentQuestion = this.listOfQuestionsArr[this.indexQuestions].question
      }
    )
  }

  goBack() {
    this.navController.back();
  }

  goToPreviousPage() {
    if ((this.indexQuestions - 1) > -1) {
      this.indexQuestions--
      this.currentQuestion = this.listOfQuestionsArr[this.indexQuestions].question
      // recover previous ticked answer?
    }
  }
  goToNextPage() {
    this.httpService.sendQuestionResult(this.globalVariablesService.uuid, this.globalVariablesService.selectedSurvey_id ,this.listOfQuestionsArr[this.indexQuestions].question_id, +this.selectedAnswer, gazeData).subscribe(
      (response) => { console.log(response) }
    )
    gazeData = []
    if ((this.indexQuestions + 1 < this.listOfQuestionsArr.length)) {
      this.indexQuestions++
      this.currentQuestion = this.listOfQuestionsArr[this.indexQuestions].question

    }
  }

  /**
   * function to help getting all information about the radiobuttons
   * and sending it with an http request to server
   */
  resize() {
    const rect1 = document.getElementById('radio1')?.getBoundingClientRect()
    const rect2 = document.getElementById('radio2')?.getBoundingClientRect()
    const rect3 = document.getElementById('radio3')?.getBoundingClientRect()
    const rect4 = document.getElementById('radio4')?.getBoundingClientRect()
    const rect5 = document.getElementById('radio5')?.getBoundingClientRect()

    if (rect1 != undefined && rect2 != undefined && rect3 != undefined && rect4 != undefined && rect5 != undefined) {
      var rectArr: DOMRect[] = [rect1, rect2, rect3, rect4, rect5]
      this.httpService.updateUserData(this.globalVariablesService.uuid, rectArr).subscribe(
        (response) => { console.log(response) }
      )

    } else {
      console.error("One of the radioButtons DOMRect is undefined! No Request to server.")
    }

  }

  /**
   * debounce function used for the window resizing that we send less http requests to server
   * @param func
   * @param wait 
   * @returns 
   */
  debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args:any) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}


}
