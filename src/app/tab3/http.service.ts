import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
providedIn:  'root'
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

  const options = {headers: headers}

  return this.http.post(environment.uriToServer, data, options)
}
/**
 * Used to receive all available survey names from the database
 * @returns 
 */
getSurveyNames(): Observable<any[]> {
  const url = environment.uriToServer + "/index.php/survey/listNames"
  console.log("GET REQUEST for names of survey to " + url)
  return this.http.get<any[]>(url)
}

/**
 * Used to receive the survey with the specific name
 * @param name 
 * @returns 
 */
getSurveyWithName(name: string) {
var url = environment.uriToServer + "/index.php/survey/getSelected"
if(name!=null && name!='') {
  url += "?name=" + name 
}
console.log("GET REQUEST for a survey to " + url)
return this.http.get(url)
}
}
