import { CandidatesService } from './candidates.service';
import * as XLSX from 'xlsx';

describe('CandidatesService', () => {
  let service: CandidatesService;

  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  beforeEach(() => {
    service = new CandidatesService();
    // Clear localStorage before each test
    localStorage.clear();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
