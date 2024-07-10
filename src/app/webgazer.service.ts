import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';

declare var webgazer: any;

@Injectable({
  providedIn: 'root'
})
export class WebgazerService {

  private data = new Subject<Data>();

  globalVariableService: GlobalVariablesService

  constructor(globalVariablesService: GlobalVariablesService) {
    this.globalVariableService = globalVariablesService
   }

   
   begin() {
    return webgazer.setRegression('weightedRidge')
      .saveDataAcrossSessions(true)
      .showVideo(false)
      .showPredictionPoints(false)
      .begin();
  }

  pause() {
    return webgazer.pause()
  }

  setGazeListenerForSurvey(gazeData: any[]) {
    return webgazer.setGazeListener((data: any, clock: any) => {
      if (data == null) {
        return;
      }
      webgazer.util.bound(data);
      gazeData.push(data)

    })
  }

  setGazeListenerForCalibration() {
    var k = 0;
    return webgazer.setGazeListener((data: any, clock: any) => {
        if (data == null) {
          return;
        }
        webgazer.util.bound(data);
        if (this.globalVariableService.storingPoints) {
          webgazer.storePoints(data.x, data.y, k);
          this.sendData(data)
          k++;
          if (k == 50) {
            k = 0;
          }
        }
      })
  }

  resume() {
    return webgazer.resume()
  }

  getStoredPoints() {
    return webgazer.getStoredPoints()
  }

  sendData(data: Data) {
    this.data.next(data)
  }

  getData() {
    return this.data.asObservable()
  }
}

export interface Data {
  x: any;
  y: any;
}
