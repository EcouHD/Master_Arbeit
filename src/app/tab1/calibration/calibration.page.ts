import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavController } from '@ionic/angular';

declare var webgazer: any;

const BUTTONS = [0, 0, 0, 0, 0, 0, 0, 0, 0];

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.page.html',
  styleUrls: ['./calibration.page.scss'],
})
export class CalibrationPage implements OnInit {

  calibrationButtonDisable = true;

  buttons = BUTTONS;

  @ViewChildren('dot') dots!: QueryList<ElementRef>;

  pointsCalibrated = 0;

  navController: any;

  constructor(navController: NavController) {
    this.navController = navController
    webgazer.resume();
    for(let i = 0; i < this.buttons.length; i++) {
      this.buttons[i] = 0;
    }
  }

  ngOnInit() {
  }


  buttonClicked(index: any) {
    const dot = this.dots.find((x: ElementRef, i: number) => i == index);

    if (this.buttons[index] == 0) {
      dot?.nativeElement.classList.remove('state1');
      dot?.nativeElement.classList.add('state2');
    } else if (this.buttons[index] == 1) {
      dot?.nativeElement.classList.remove('state2');
      dot?.nativeElement.classList.add('state3');
    } else if (this.buttons[index] == 2) {
      dot?.nativeElement.classList.remove('state3');
      dot?.nativeElement.classList.add('state4');
    } else if (this.buttons[index] == 3) {
      dot?.nativeElement.classList.remove('state4');
      dot?.nativeElement.classList.add('state5');
    } else if (this.buttons[index] == 4) {
      dot?.nativeElement.classList.remove('state5');
      dot?.nativeElement.classList.add('stateFinished');
      this.pointsCalibrated++;
    }
    this.buttons[index]++;
    console.log(this.pointsCalibrated);

    if (this.pointsCalibrated == 8 && this.calibrationButtonDisable) {
      //activate middle button
      const middleDot = this.dots.find((x: ElementRef, i: number) => i == 4);
      middleDot?.nativeElement.classList.remove('calibration');
      middleDot?.nativeElement.classList.add('state1');
      this.calibrationButtonDisable = false;
    }

    if (this.pointsCalibrated >= 9) {
      console.log("Calibration finished. Start accuracy calc!")
    }
  }

  goBack() {
    this.navController.back();
  }
}

