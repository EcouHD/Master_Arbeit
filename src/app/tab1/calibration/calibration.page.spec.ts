import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CalibrationPage } from './calibration.page';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, QueryList } from '@angular/core';
import { WebgazerService } from 'src/app/webgazer.service';
import { of } from 'rxjs';

describe('CalibrationPage', () => {
  let component: CalibrationPage;
  let fixture: ComponentFixture<CalibrationPage>;
  const mockData = { x: 200, y: 200 };
  const webgazerSpy = jasmine.createSpyObj('webgazerService', ['setGazeListenerForCalibration', 'resume', 'pause', 'getData',]);
  webgazerSpy.getData.and.returnValue(of(mockData))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalibrationPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: WebgazerService, useValue: webgazerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(CalibrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw coordinates in blue', () => {
    spyOn(component, 'drawCoordinates');
    component.ngOnInit();
    expect(component.drawCoordinates).toHaveBeenCalledWith('blue', mockData.x, mockData.y);
  });

  it('should navigate back on every page/component', () => {
    spyOn(component.navController, 'back');
    component.goBack();
    expect(component.navController.back).toHaveBeenCalled();
  });

  it('should change state of dot on click', () => {
    const mockDot = component.dots.find((x: ElementRef, i: number) => i == 0)
    spyOn(component.dots, 'find').and.returnValue(mockDot)
    component.buttonClicked(0)
    expect(component.dots.find).toHaveBeenCalled();
    expect(mockDot?.nativeElement.classList).toContain('state2')
    component.buttonClicked(0)
    expect(mockDot?.nativeElement.classList).toContain('state3')
    component.buttonClicked(0)
    expect(mockDot?.nativeElement.classList).toContain('state4')
    component.buttonClicked(0)
    expect(mockDot?.nativeElement.classList).toContain('state5')
    expect(component.pointsCalibrated).toBe(0)
    component.buttonClicked(0)
    expect(mockDot?.nativeElement.classList).toContain('stateFinished')
    expect(component.pointsCalibrated).toBe(1)

  });

  it('should activate middle button when all other dots calibrated', () => {
    const mockDot = component.dots.find((x: ElementRef, i: number) => i == 4)
    component.pointsCalibrated = 7
    component.buttonClicked(4)
    expect(mockDot?.nativeElement.classList).toContain('deactivated')
    component.pointsCalibrated++
    component.buttonClicked(4)
    expect(mockDot?.nativeElement.classList).not.toContain('deactivated')

  });

  it('should disable all buttons and activate calibration dot when middle dot is finished', () => {
    const mockDot = component.dots.find((x: ElementRef, i: number) => i == 4)
    const mockDot0 = component.dots.find((x: ElementRef, i: number) => i == 0)
    component.pointsCalibrated = 8
    component.calibrationButtonDisable = false

    spyOn(component.dots, 'forEach').and.returnValues(mockDot0?.nativeElement.classList.remove("stateFinished"), mockDot0?.nativeElement.classList.add("deactivated"))
    spyOn(component, 'presentAlert')
    
    component.buttonClicked(4)
    component.buttonClicked(4)
    component.buttonClicked(4)
    component.buttonClicked(4)
    component.buttonClicked(4)
    expect(component.dots.forEach).toHaveBeenCalled()
    expect(mockDot0?.nativeElement.classList).toContain('deactivated')
    expect(component.presentAlert).toHaveBeenCalled()
    expect(mockDot?.nativeElement.classList).toContain('stateFinished')

  });

  // it('should calculate the precision correct', () => {
  //   spyOn(window, 'innerHeight').and.returnValue(800)
  //   expect(window.innerHeight).toBe(800)

  // });
});
