import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {
  
  navController: NavController;
  
  constructor(navController: NavController) { this.navController = navController}

  ngOnInit() {
  }

  goBack() {
    this.navController.back();
  }

  goToPreviousPage() {
    console.log("Back Button pressed.")
  }
  goToNextPage() {
    console.log("Next Button pressed.")
  }

}
