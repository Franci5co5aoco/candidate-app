/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-output-native */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidatesComponent } from './candidates.component';
import { CandidatesService } from '@candidate-app/client';
import { CandidatesHttpService } from './candidates-http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { EventEmitter } from 'stream';
import { of } from 'rxjs';
// Mock Candidate type
const mockCandidate = {
  name: 'John',
  surname: 'Doe',
  seniority: 'junior',
  years: 2,
  availability: 'immediate'
};

// Children component mock
@Component({
  selector: 'please-read-banner',
  template: '<div>{{ value }}</div>'
})
class MockAPleaseReadComponent {
}
@Component({
  selector: 'add-candidate',
  template: '<div>{{ value }}</div>'
})
class MockAddCandidateComponent {
  @Output() submitted = new EventEmitter();
}
@Component({
  selector: 'show-candidates',
  template: '<div>{{ value }}</div>'
})
class MockShowCandidatesComponent {
  @Input() candidates = [];
  @Output() reset = new EventEmitter();
}

describe('CandidatesComponent', () => {
  let component: CandidatesComponent;
  let fixture: ComponentFixture<CandidatesComponent>;

  const candidatesSignalMock = jest.fn(() => [mockCandidate])  as any;
  candidatesSignalMock.set = jest.fn();
  candidatesSignalMock.update = jest.fn();

  const mockCandidatesService = {
    candidates: candidatesSignalMock,
    getCandidateData: jest.fn().mockReturnValue([mockCandidate]),
    resetCandidateData: jest.fn(),
    generateExcell: jest.fn(),
    saveCandidateData: jest.fn(),
    isCandidateAdded: jest.fn().mockReturnValue(false)
  };

  const mockHttpService = {
    postCandidate: jest.fn().mockReturnValue(of(mockCandidate)),
  };

  const mockSnackBar = {
    open: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CandidatesComponent, 
        MockAddCandidateComponent, 
        MockShowCandidatesComponent,
        MockAPleaseReadComponent
      ],
      providers: [
        { provide: CandidatesService, useValue: mockCandidatesService },
        { provide: CandidatesHttpService, useValue: mockHttpService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    (component as any).snackBar = mockSnackBar;
    // (component as any).candidatesHttpService = mockHttpService;
    // (component as any).candidatesService = mockCandidatesService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set candidates if data is available', () => {
      const candidates = component.candidatesService.getCandidateData();
      expect(candidates).toEqual([mockCandidate]);
      expect(component.candidates.set).toHaveBeenCalledWith(candidates);
    });
  });

  describe('onResetData', () => {
    it('should reset candidate data', () => {
      component.onResetData();
      expect(component.candidatesService.resetCandidateData).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should call postCandidate and update candidates', () => {
      const formValues = { ...mockCandidate };
      const formData = new FormData();
      formData.append('data', JSON.stringify(formValues));

      mockCandidatesService.generateExcell.mockReturnValue(formData);

      component.onSubmit(formValues as any);

      expect(mockHttpService.postCandidate).toHaveBeenCalledWith(formData);
      expect(component.candidates.update).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('showSuccess', () => {
    it('should open the snackbar with success message', () => {
      const snackBarOpts = {
        duration: 3500,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      };
      
      expect(mockSnackBar.open).not.toHaveBeenCalled();
      component.showSuccess();
      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Candidate added successfully!',
        'Close',
        snackBarOpts);
    });
  });           

});   
