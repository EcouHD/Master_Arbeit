import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  navController: NavController;
  
  constructor(navController: NavController) { this.navController = navController}

  ngOnInit() {
  }

  goBack() {
    this.navController.back();
  }

}
