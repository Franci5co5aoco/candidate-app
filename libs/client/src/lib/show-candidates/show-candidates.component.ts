import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '@candidate-app/shared';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'show-candidates',
  imports: [CommonModule, MatTableModule],
  templateUrl: './show-candidates.component.html',
  styleUrl: './show-candidates.component.scss',
})
export class ShowCandidatesComponent {
  @Input() candidates!: WritableSignal<Candidate[]>;
  displayedColumns: string[] = ['name', 'surname', 'seniority', 'yearsOfExperience', 'availability'];

}
