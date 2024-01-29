import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CalibrationPage } from './calibration.page';

describe('CalibrationPage', () => {
  let component: CalibrationPage;
  let fixture: ComponentFixture<CalibrationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CalibrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
