import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '@candidate-app/shared';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-candidates',
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css',
})
export class CandidatesComponent {
  candidate: Candidate = {
    name: '',
    surname: '',
    seniority: 'junior',
    yearsOfExperience: 0,
    availability: true
  };
}
