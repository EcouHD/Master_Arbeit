import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  uuid = ''

  selectedSurveyName = 'default'

  selectedSurvey_id = 0

  selectedSurvey = []

  constructor() { }
}
