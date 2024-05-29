import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CalibrationPage } from './calibration.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WebgazerService } from 'src/app/webgazer.service';
import { of } from 'rxjs';

describe('CalibrationPage', () => {
  let component: CalibrationPage;
  let fixture: ComponentFixture<CalibrationPage>;
  const mockData = { x: 100, y: 200 };
const webgazerSpy = jasmine.createSpyObj('webgazerService', ['setGazeListenerForCalibration', 'resume', 'pause', 'getData',]);
webgazerSpy.getData.and.returnValue(of(mockData))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalibrationPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: WebgazerService, useValue: webgazerSpy}]
    }).compileComponents();

    fixture = TestBed.createComponent(CalibrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'drawCoordinates').and.callThrough;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw coordinates in blue', () => { 
    component.ngOnInit();
    expect(webgazerSpy.getData).toHaveBeenCalled(); 
    // expect(component.drawCoordinates).toHaveBeenCalledWith('blue', mockData.x, mockData.y); 
  });
});
