import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SurveyPage } from './survey.page';
import { WebgazerService } from 'src/app/webgazer.service';


describe('SurveyPage', () => {
  let component: SurveyPage;
  let fixture: ComponentFixture<SurveyPage>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const webgazerSpy = jasmine.createSpyObj('webgazerService', ['setGazeListenerForSurvey', 'resume', 'pause']);
  const utilSpy = jasmine.createSpyObj('util', ['bound']);
  webgazerSpy.util = utilSpy;
  webgazerSpy.setGazeListenerForSurvey.and.returnValue("default Webgazerobject");

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [{provide: WebgazerService, useValue: webgazerSpy}]
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    
  
    fixture = TestBed.createComponent(SurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
