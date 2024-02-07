import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

declare var webgazer: any;

const BUTTONS = [
  { id: 1, clicked: 0 },
  { id: 2, clicked: 0 },
  { id: 3, clicked: 0 },
  { id: 4, clicked: 0 },
  { id: 5, clicked: 0 },
  { id: 6, clicked: 0 },
  { id: 7, clicked: 0 },
  { id: 8, clicked: 0 },
  { id: 9, clicked: 0 }
]

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.page.html',
  styleUrls: ['./calibration.page.scss'],
})
export class CalibrationPage implements OnInit {

  calibrationButtonDisable = true;

  buttons = BUTTONS;

  @ViewChild('Pt0') button0: any;
  @ViewChild('Pt1') button1: any;
  @ViewChild('Pt2') button2: any;
  @ViewChild('Pt3') button3: any;
  @ViewChild('Pt4') button4: any;
  @ViewChild('Pt5') button5: any;
  @ViewChild('Pt6') button6: any;
  @ViewChild('Pt7') button7: any;
  @ViewChild('CalibrationPoint') buttonCalibration: any;

  pointsCalibrated = 0;

  navController: any;

  constructor(navController: NavController) {
    this.navController = navController
    webgazer.resume();
    this.buttons.forEach(element => { element.clicked = 0});
  }

  ngOnInit() {
  }


  buttonClicked(buttonId: any) {
    if (buttonId == 0) {
      this.buttons[buttonId].clicked++;
      if (this.buttons[buttonId].clicked < 5) {
        var opacity = 1 - 0.2*this.buttons[buttonId].clicked + 0.1
        this.button0.el.style.setProperty('--opacity', opacity)
      } else if (this.buttons[buttonId].clicked == 5) {
        this.button0.el.style.setProperty('--background', 'red')
        this.button0.el.style.setProperty('--opacity', '1.0')
        this.pointsCalibrated++
      }
    } else if (buttonId == 1) {
      this.buttons[buttonId].clicked++;
      if (this.buttons[buttonId].clicked < 5) {
        var opacity = 1 - 0.2*this.buttons[buttonId].clicked + 0.1
        this.button1.el.style.setProperty('--opacity', opacity)
      } else if (this.buttons[buttonId].clicked == 5) {
        this.button1.el.style.setProperty('--background', 'red')
        this.button1.el.style.setProperty('--opacity', '1.0')
        this.pointsCalibrated++
      }
    } else if (buttonId == 2) {
      this.buttons[buttonId].clicked++;
      if (this.buttons[buttonId].clicked < 5) {
        var opacity = 1 - 0.2*this.buttons[buttonId].clicked + 0.1
        this.button2.el.style.setProperty('--opacity', opacity)
      } else if (this.buttons[buttonId].clicked == 5) {
        this.button2.el.style.setProperty('--background', 'red')
        this.button2.el.style.setProperty('--opacity', '1.0')
        this.pointsCalibrated++
      }
    } else if (buttonId == 3) {
      this.buttons[buttonId].clicked++;
      if (this.buttons[buttonId].clicked < 5) {
        var opacity = 1 - 0.2*this.buttons[buttonId].clicked + 0.1
        this.button3.el.style.setProperty('--opacity', opacity)
      } else if (this.buttons[buttonId].clicked == 5) {
        this.button3.el.style.setProperty('--background', 'red')
        this.button3.el.style.setProperty('--opacity', '1.0')
        this.pointsCalibrated++
      }
    } else if (buttonId == 4) {
      this.buttons[buttonId].clicked++;
      if (this.buttons[buttonId].clicked < 5) {
        var opacity = 1 - 0.2*this.buttons[buttonId].clicked + 0.1
        this.button4.el.style.setProperty('--opacity', opacity)
      } else if (this.buttons[buttonId].clicked == 5) {
        this.button4.el.style.setProperty('--background', 'red')
        this.button4.el.style.setProperty('--opacity', '1.0')
        this.pointsCalibrated++
      }
    } else if (buttonId == 5) {
      this.buttons[buttonId].clicked++;
      if (this.buttons[buttonId].clicked < 5) {
        var opacity = 1 - 0.2*this.buttons[buttonId].clicked + 0.1
        this.button5.el.style.setProperty('--opacity', opacity)
      } else if (this.buttons[buttonId].clicked == 5) {
        this.button5.el.style.setProperty('--background', 'red')
        this.button5.el.style.setProperty('--opacity', '1.0')
        this.pointsCalibrated++
      }
    } else if (buttonId == 6) {
      this.buttons[buttonId].clicked++;
      if (this.buttons[buttonId].clicked < 5) {
        var opacity = 1 - 0.2*this.buttons[buttonId].clicked + 0.1
        this.button6.el.style.setProperty('--opacity', opacity)
      } else if (this.buttons[buttonId].clicked == 5) {
        this.button6.el.style.setProperty('--background', 'red')
        this.button6.el.style.setProperty('--opacity', '1.0')
        this.pointsCalibrated++
      }
    } else if (buttonId == 7) {
      this.buttons[buttonId].clicked++;
      if (this.buttons[buttonId].clicked < 5) {
        var opacity = 1 - 0.2*this.buttons[buttonId].clicked + 0.1
        this.button7.el.style.setProperty('--opacity', opacity)
      } else if (this.buttons[buttonId].clicked == 5) {
        this.button7.el.style.setProperty('--background', 'red')
        this.button7.el.style.setProperty('--opacity', '1.0')
        this.pointsCalibrated++
      }
    } else if (buttonId == 8) {
      this.buttons[buttonId].clicked++;
      if (this.buttons[buttonId].clicked < 5) {
        var opacity = 1 - 0.2*this.buttons[buttonId].clicked + 0.1
        this.buttonCalibration.el.style.setProperty('--opacity', opacity)
      } else if (this.buttons[buttonId].clicked == 5){
        this.buttonCalibration.el.style.setProperty('--background', 'red')
        this.buttonCalibration.el.style.setProperty('--opacity', '1.0')
        this.pointsCalibrated++
      }
    }

    if(this.pointsCalibrated == 8) {
      this.calibrationButtonDisable = false;
      this.buttonCalibration.el.style.setProperty('--opacity', '1.0')
    }

    if(this.pointsCalibrated >=9) {
      console.log("Calibration finished. Start accuracy calc!")
    }
  }

  goBack() {
    this.buttons = BUTTONS;
    this.navController.back();
  }
}

