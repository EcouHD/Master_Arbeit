import { Component, OnInit } from '@angular/core';
import { CalibrationComponent } from '../calibration/calibration.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  component = CalibrationComponent;

  constructor() { }

  ngOnInit() {}

}
