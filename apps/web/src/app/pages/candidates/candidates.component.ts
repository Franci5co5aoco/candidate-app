import { Component, inject } from '@angular/core';
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

  onSubmit(formValues: Candidate) {
    console.log('Form submited:', formValues);
    const jsonToExcellData = {
      seniority: formValues.seniority as 'junior' | 'senior',
      yearsOfExperience: formValues.yearsOfExperience || 0,
      availability: formValues.availability || true
    }

    // Get FormData
    const formData = this.candidatesService.generateExcell(jsonToExcellData);

    const jsonData = {
      name: formValues.name,
      surname: formValues.surname,
    };

    // Appends the JSON data to the FormData object
    formData.append('json', JSON.stringify(jsonData));
    console.log('formData:', formData);
    
    // Send the FormData object to the server
    this.candidatesHttpService.postCandidate(formData).subscribe({ 
      next: (response) => {
        console.log('Response from server:', response);
      },
      error: (error) => {
        console.error('Error uploading file:', error);
      }
    });
  }
}
