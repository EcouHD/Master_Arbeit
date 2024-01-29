import { Component, OnInit } from '@angular/core';
import { CalibrationPage } from '../calibration/calibration.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  component = CalibrationPage;

  constructor() { }

  ngOnInit() {
  }

}
