import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '@candidate-app/shared';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
  private fb = inject(FormBuilder)

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
    seniority: ['', [Validators.required]],
    yearsOfExperience: ['0', [Validators.required, Validators.min(0), Validators.max(70)]],
    availability: [true]
  });

  onSubmit() {
    if (this.candidateForm.valid) {
      const formValues = this.candidateForm.value;
      console.log('Form submitted:', formValues);
    } else {
      console.log('Form is invalid');
    }
  }
}
