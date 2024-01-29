import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.page.html',
  styleUrls: ['./calibration.page.scss'],
})
export class CalibrationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  buttonClicked(id: any) {
    console.log("Button " + id + " pressed!")
  }

}

