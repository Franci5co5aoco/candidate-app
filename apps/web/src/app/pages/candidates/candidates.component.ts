import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '@candidate-app/shared';
import { CandidatesService } from '@candidate-app/client';
import { CandidatesHttpService } from './candidates-http.service';
import { AddCandidateComponent, PleaseReadBannerComponent, ShowCandidatesComponent } from '@candidate-app/client';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-candidates',
  imports: [
    CommonModule,
    AddCandidateComponent,
    ShowCandidatesComponent,
    PleaseReadBannerComponent,
    MatSnackBarModule
  ],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
})
export class CandidatesComponent implements OnInit {
  private candidatesHttpService = inject(CandidatesHttpService);
  snackBar = inject(MatSnackBar);
  candidatesService = inject(CandidatesService);
  candidates: WritableSignal<Candidate[]> = this.candidatesService.candidates;
  
  ngOnInit(): void {
    const candidates = this.candidatesService.getCandidateData();
    if (candidates && candidates.length) {
      this.candidates.set(candidates);
    }
  }

  onResetData() {
    this.candidatesService.resetCandidateData();
  }

  // Method to refacto in a service
  showSuccess() {
    this.snackBar.open('Candidate added successfully!', 'Close', {
      duration: 3500,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  onSubmit(formValues: Candidate) {
    const jsonToExcellData = {
      seniority: formValues.seniority as 'junior' | 'senior',
      years: formValues.years || 0,
      availability: formValues.availability
    }

    // Get FormData
    const formData = this.candidatesService.generateExcell(jsonToExcellData);

    const jsonData = {
      name: formValues.name,
      surname: formValues.surname,
    };

    // Appends the JSON data to the FormData object
    formData.append('data', JSON.stringify(jsonData));
    
    // Send the FormData object to the server
    this.candidatesHttpService.postCandidate(formData).subscribe({ 
      next: (response) => {
        this.candidates.update((prev) => [...prev, response]);
        this.candidatesService.saveCandidateData(this.candidatesService.candidates());
        this.candidatesService.isCandidateAdded.set(true);
        this.showSuccess();
      },
      error: (error) => {
        console.error('Error uploading file:', error);
      }
    });
  }
}
