import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  @ViewChildren('dot') dots!: QueryList<ElementRef>;
  navController: NavController;
  
  constructor(navController: NavController) { this.navController = navController}

  ngOnInit() {
  }

  goBack() {
    this.navController.back();
  }
  animate(index: number) {
    const dot = this.dots.find((x: ElementRef, i: number) => i == index);
    dot?.nativeElement.classList.remove('show');
    dot?.nativeElement.classList.add('animate');
  }

}
