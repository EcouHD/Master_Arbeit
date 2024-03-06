import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

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
  alertController: any;

  constructor(navController: NavController, alertController: AlertController) {
    this.navController = navController
    this.alertController = alertController;
    webgazer.resume();
    for (let i = 0; i < this.buttons.length; i++) {
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
      middleDot?.nativeElement.classList.remove('deactivated');
      middleDot?.nativeElement.classList.add('state1');
      this.calibrationButtonDisable = false;
    }

    if (this.pointsCalibrated >= 9) {
      this.dots.forEach(element => {
        element?.nativeElement.classList.remove('stateFinished');
        element?.nativeElement.classList.add('deactivated');
      });

      //activate middle button
      const middleDot = this.dots.find((x: ElementRef, i: number) => i == 4);
      middleDot?.nativeElement.classList.remove('deactivated');
      middleDot?.nativeElement.classList.add('stateFinished');
      console.log("Calibration finished. Start accuracy calc!")
      this.presentAlert();
    }
  }

  goBack() {
    this.navController.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: [
        {
          text: 'Confirm',
          handler: () => {
            this.setResult();
          }
        }
      ],
    });

    await alert.present();
  }
  async presentAlertAccuracy(precision_measurement: any) {
    const alert = await this.alertController.create({
      header: 'Acc',
      message: 'Accuracy is ' + precision_measurement,
      buttons: ['OK'],
    });

    await alert.present();
  }

  setResult() {
    console.log("Start sleep.")
    this.sleep(5000).then(() => {
      console.log("Dismissed!")
      var past50 = webgazer.getStoredPoints()
      console.log(webgazer.getStoredPoints())
      var precision_measurement = this.calculatePrecision(past50)
      console.log("Genauigkeit: " + precision_measurement)
      this.presentAlertAccuracy(precision_measurement)
    });

  }

  calculatePrecision(past50Array: any) {
    var windowHeight = window.innerHeight
    var windowWidth = window.innerWidth

    var x50 = past50Array[0]
    var y50 = past50Array[1]

    var staringPointX = windowHeight / 2
    var staringPointY = windowWidth / 2

    var precisionPercentages = new Array(50)
    this.calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY)
    var precision = this.calculateAverage(precisionPercentages)

    console.log("Window: " + windowHeight + " , " + windowWidth)
    console.log("PastArray: " + past50Array)
    console.log("PastArray (x,y): " + x50 + " , " + y50)

    return Math.round(precision)
  }

  calculatePrecisionPercentages(precisionPercentages: any, windowHeight: any, x50: any, y50: any, staringPointX: any, staringPointY: any) {
    for (let x = 0; x < 50; x++) {
      // Calculate distance between each prediction and staring point
      var xDiff = staringPointX - x50[x];
      var yDiff = staringPointY - y50[x];
      var distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

      // Calculate precision percentage
      var halfWindowHeight = windowHeight / 2;
      var precision = 0;
      if (distance <= halfWindowHeight && distance > -1) {
        precision = 100 - (distance / halfWindowHeight * 100);
      } else if (distance > halfWindowHeight) {
        precision = 0;
      } else if (distance > -1) {
        precision = 100;
      }

      // Store the precision
      precisionPercentages[x] = precision;
    }
  }

  calculateAverage(precisionPercentages: any) {
    var precision = 0;
    for (let x = 0; x < 50; x++) {
      precision += precisionPercentages[x];
    }
    precision = precision / 50;
    return precision;
  }

  sleep(time: any) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}

