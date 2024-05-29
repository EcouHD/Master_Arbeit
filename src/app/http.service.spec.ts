import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { Survey } from './survey';
import { environment } from 'src/environments/environment';

describe('HttpService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpService = new HttpService(httpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(httpService).toBeTruthy();
  });

  describe('getSurveys', () => {
    const testSurvey: Survey[] = [
      {
        survey_id: 1,
        name: "TestSurvey",
        list_of_questions: "string of questions"
      },
      {
        survey_id: 2,
        name: "default",
        list_of_questions: "string of default questions"
      }
    ];


    it('should return expected survey[] from getSurveyNames() (called once)', () => {

      httpService.getSurveyNames().subscribe(response => expect(response).toEqual(testSurvey));

      const req = httpTestingController.expectOne(environment.uriToServer + "/index.php/survey/listNames");

      expect(req.request.method).toEqual('GET');

      req.flush(testSurvey);
    });

    it('should return expected survey[] from getSurveyWithName(name) (called once)', () => {

      httpService.getSurveyWithName(testSurvey[0].name).subscribe(response => expect(response[0]).toEqual(testSurvey[0]));

      const req = httpTestingController.expectOne(environment.uriToServer + "/index.php/survey/getSelected?name=" + testSurvey[0].name);

      expect(req.request.method).toEqual('GET');

      req.flush(testSurvey);

    });
  });

  describe('UserData', () => {
    const uuid = '12af';
    it('should set user and return correct string from setUserData(uuid) (called once)', () => {
      const responseString = "Created user successfully."
      httpService.setUserData(uuid).subscribe(response => expect(response).toEqual(responseString));

      const req = httpTestingController.expectOne(environment.uriToServer + "/index.php/user/createUser?uuid=" + uuid);

      expect(req.request.method).toEqual('POST');


      req.flush(responseString);
    });
  });
});
