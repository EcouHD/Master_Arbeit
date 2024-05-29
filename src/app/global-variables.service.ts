import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  uuid = ''

  infoLabel = 'Currently not calibrated. Continue with calibration.'
  
  storingPoints = false

  selectedSurveyName = 'default'

  selectedSurvey_id = 0

  selectedSurvey = []

  constructor() { }
}
