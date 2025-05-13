import { TestBed } from '@angular/core/testing';

import { CandidatesHttpService } from './candidates-http.service';

describe('CandidatesHttpService', () => {
  let service: CandidatesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
