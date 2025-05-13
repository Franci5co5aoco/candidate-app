import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '@candidate-app/shared';
import { CandidatesService } from './candidates.service';
import { CandidatesHttpService } from './candidates-http.service';
import { AddCandidateComponent, PleaseReadBannerComponent, ShowCandidatesComponent } from '@candidate-app/client';

@Component({
  selector: 'app-candidates',
  imports: [
    CommonModule,
    AddCandidateComponent,
    ShowCandidatesComponent,
    PleaseReadBannerComponent,
  ],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
})
export class CandidatesComponent {
  private candidatesService = inject(CandidatesService);
  private candidatesHttpService = inject(CandidatesHttpService);
  candidates = this.candidatesService.candidates;

  onSubmit(formValues: Candidate) {
    const jsonToExcellData = {
      seniority: formValues.seniority as 'junior' | 'senior',
      years: formValues.years || 0,
      availability: formValues.availability || true
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
        console.log('Response from server:', response);
        this.candidates.update((prev) => [...prev, response]);
        console.log('this.candidatesService.candidates:', this.candidatesService.candidates());
      },
      error: (error) => {
        console.error('Error uploading file:', error);
      }
    });
  }
}
