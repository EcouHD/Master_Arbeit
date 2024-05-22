import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoadSurveyPage } from './load-survey.page';

describe('LoadSurveyPage', () => {
  let component: LoadSurveyPage;
  let fixture: ComponentFixture<LoadSurveyPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(LoadSurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
