import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '@candidate-app/shared';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CandidatesService } from '../services/candidates.service';


@Component({
  selector: 'add-candidate',
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
  templateUrl: './add-candidate.component.html',
  styleUrl: './add-candidate.component.scss',
})
export class AddCandidateComponent {
  private fb = inject(FormBuilder);
  private candidatesService = inject(CandidatesService);
  @Output() submitted = new EventEmitter<Candidate>();

  constructor() {
    effect(() => {
      if(this.candidatesService.isCandidateAdded()) {
        // Reset the form with predefined values
        this.candidateForm.setValue({
          name: '',
          surname: '',
          seniority: 'junior',
          years: 0, 
          availability: true
        });

        this.candidatesService.isCandidateAdded.set(false);
      }
    });
  }

  candidateForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    surname: ['', [Validators.required,  Validators.minLength(3), Validators.maxLength(20)]],
    seniority: ['junior', [Validators.required]],
    years: [0, [Validators.required, Validators.min(0), Validators.max(70)]],
    availability: [true]
  });

  onSubmit() {
    if (this.candidateForm.valid) {
      const formValues = this.candidateForm.value;
      this.submitted.emit(formValues as Candidate);
    } else {
      console.log('Form is invalid');
    }
  }
}
