import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Survey } from '../survey';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  public currentSurveyName = 'default'

  constructor(private http: HttpClient) { }

  /**
   * this is an example of how to send a simple post request
   * should be changed to sending the gazeData array with the answer of the question_id
   * or other stuff we need to send from application to server/database
   * @returns 
   */
  sendData() {
    const data = {
      "username": "BobTest1",
      "user_email": "bob@gmail.com",
      "user_status": "0"
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const options = { headers: headers }

    return this.http.post(environment.uriToServer, data, options)
  }
  /**
   * Used to receive all available survey names from the database
   * @returns 
   */
  getSurveyNames(): Observable<Survey[]> {
    const url = environment.uriToServer + "/index.php/survey/listNames"
    console.log("GET REQUEST for names of survey to " + url)
    return this.http.get<Survey[]>(url)
  }

  /**
   * Used to receive the survey with the specific name
   * @param name 
   * @returns 
   */
  getSurveyWithName(name: string): Observable<Survey[]> {
    var url = environment.uriToServer + "/index.php/survey/getSelected"
    if (name != null && name != '') {
      url += "?name=" + name
    }
    console.log("GET REQUEST for a survey with name " + name + " to " + url)
    return this.http.get<Survey[]>(url)
  }

  sendQuestionResult(question_id: number, answer: number, gazeData: any[]) {
    const url = environment.uriToServer + "/index.php/survey/sendQuestionResult"
    const survey_id = 2;
    const user_id = 1;

    const data = {
      "survey_id": survey_id,
      "user_id": user_id,
      "question_id": question_id,
      "answer": answer,
      "gazeData": gazeData
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const options = { headers: headers }

    console.log("POST REQUEST to send result of one question to " + url)
    return this.http.post(url, data, options)
  }

  setUserData(user_id: number) {
    var url = environment.uriToServer + "/index.php/user/createUser"

    if (user_id != null && user_id != undefined) {
      url += "?user=" + user_id
    }

    console.log("POST REQUEST to send base user data to " + url)
    return this.http.post(url, {})
  }

  updateUserData(user_id: number, age: number, rectArr: DOMRect[]) {
    const url = environment.uriToServer + "/index.php/user/updateData"

    const data = {
      "user_id": user_id,
      "age": age,
      "radioButton1_x": rectArr[0].x,
      "radioButton1_y": rectArr[0].y,
      "radioButton1_width": rectArr[0].width,
      "radioButton1_height": rectArr[0].height,
      "radioButton2_x": rectArr[1].x,
      "radioButton2_y": rectArr[1].y,
      "radioButton2_width": rectArr[1].width,
      "radioButton2_height": rectArr[1].height,
      "radioButton3_x": rectArr[2].x,
      "radioButton3_y": rectArr[2].y,
      "radioButton3_width": rectArr[2].width,
      "radioButton3_height": rectArr[2].height,
      "radioButton4_x": rectArr[3].x,
      "radioButton4_y": rectArr[3].y,
      "radioButton4_width": rectArr[3].width,
      "radioButton4_height": rectArr[3].height,
      "radioButton5_x": rectArr[4].x,
      "radioButton5_y": rectArr[4].y,
      "radioButton5_width": rectArr[4].width,
      "radioButton5_height": rectArr[4].height,
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const options = { headers: headers }

    console.log("PATCH REQUEST to send user data to " + url)
    return this.http.patch(url, data, options)
  }

  setUserAge(user_id: number, age: number) {
    var url = environment.uriToServer + "/index.php/user/setAge"

    if (user_id != null && user_id != undefined && age != null && age != undefined) {
      url += "?user=" + user_id + "&age=" + age
    }
   
    const data = {
      "user_id": user_id,
      "age": age,
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const options = { headers: headers }

    console.log("PATCH REQUEST to send base user data to " + url)
    return this.http.patch(url, {})
  }
}
