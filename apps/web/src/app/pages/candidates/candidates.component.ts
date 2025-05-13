import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '@candidate-app/shared';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CandidatesService } from './candidates.service';
import { CandidatesHttpService } from './candidates-http.service';

@Component({
  selector: 'app-candidates',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSlideToggleModule,

    MatExpansionModule,
],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
})
export class CandidatesComponent {
  private fb = inject(FormBuilder);
  private candidatesService = inject(CandidatesService);
  private candidatesHttpService = inject(CandidatesHttpService);

  candidate: Candidate = {
    name: '',
    surname: '',
    seniority: 'junior',
    yearsOfExperience: 0,
    availability: true
  };

  

  candidateForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    surname: ['', [Validators.required,  Validators.minLength(3), Validators.maxLength(20)]],
    seniority: ['junior', [Validators.required]],
    yearsOfExperience: [0, [Validators.required, Validators.min(0), Validators.max(70)]],
    availability: [true]
  });

  onSubmit() {
    if (this.candidateForm.valid) {
      const formValues = this.candidateForm.value;
      console.log('Form submitted:', formValues);
      const jsonToExcellData = {
        seniority: formValues.seniority as 'junior' | 'senior',
        yearsOfExperience: formValues.yearsOfExperience || 0,
        availability: formValues.availability || true
      }
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
    } else {
      console.log('Form is invalid');
    }
  }
}
