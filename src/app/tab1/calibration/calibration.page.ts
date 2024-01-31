import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.page.html',
  styleUrls: ['./calibration.page.scss'],
})
export class CalibrationPage implements OnInit {

  navController: any;

  constructor(navController: NavController) { this.navController = navController}

  ngOnInit() {
  }


  buttonClicked(id: any) {
    console.log("Button " + id + " pressed!")
  }

  goBack() {
    this.navController.back();
  }
}

