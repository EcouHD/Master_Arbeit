import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Survey } from '../survey';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

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

  /**
   * Used to send the result of the question with the needed parameters
   * @param uuid @param survey_id @param question_id @param answer  @param gazeData 
   * @returns 
   */
  sendQuestionResult(uuid: string, survey_id: number, question_id: number, answer: number, gazeData: any[]) {
    const url = environment.uriToServer + "/index.php/result/sendQuestionResult"

    const data = {
      "survey_id": survey_id,
      "UUID": uuid,
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

  /**
   * Used to create the user with the generated uuid
   * @param uuid 
   * @returns 
   */
  setUserData(uuid: string) {
    var url = environment.uriToServer + "/index.php/user/createUser"

    if (uuid != null && uuid != undefined) {
      url += "?uuid=" + uuid
    }

    console.log("POST REQUEST to send base user data to " + url)
    return this.http.post(url, {})
  }

  /**
   * Used to update the position and size of radioButtons of user
   * @param uuid  @param rectArr  
   * @returns 
   */
  updateUserData(uuid: string, rectArr: DOMRect[]) {
    const url = environment.uriToServer + "/index.php/user/updateData"

    const data = {
      "UUID": uuid,
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

  /**
   * Used to set the age of the user
   * @param uuid @param age 
   * @returns 
   */
  setUserAge(uuid: number, age: number) {
    var url = environment.uriToServer + "/index.php/user/setAge"

    if (uuid != null && uuid != undefined && age != null && age != undefined) {
      url += "?uuid=" + uuid + "&age=" + age
    }

    console.log("PATCH REQUEST to send base user data to " + url)
    return this.http.patch(url, {})
  }
}
