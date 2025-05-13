import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '@candidate-app/shared';

@Component({
  selector: 'app-candidates',
  imports: [CommonModule],
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
