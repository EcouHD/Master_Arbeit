import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  navController: NavController;
  
  constructor(navController: NavController) { this.navController = navController}

  ngOnInit() {
  }

  goBack() {
    this.navController.back();
  }
  animate(index: number) {
  }

}
