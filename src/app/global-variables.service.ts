import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  uuid = ''

  infoLabel = 'Currently not calibrated. Continue with calibration.'  

  selectedSurveyName = 'default'

  selectedSurvey_id = 0

  selectedSurvey = []

  constructor() { }
}
