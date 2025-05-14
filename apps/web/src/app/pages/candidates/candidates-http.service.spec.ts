import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CandidatesHttpService } from './candidates-http.service';
import { provideHttpClient } from '@angular/common/http';

describe('CandidatesHttpService', () => {
  let service: CandidatesHttpService;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:3000/api/candidates';
  const mockData = {
    name: 'John',
    surname: 'Doe',
    seniority: 'junior',
    years: 2,
    availability: 'immediate'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CandidatesHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.postData', () => {
    it('should make POST request with payload', () => {
      const testPayload = new FormData();

      service.postCandidate(testPayload).subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne(API_URL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(testPayload);
      req.flush(mockData);
    });
  });
});
