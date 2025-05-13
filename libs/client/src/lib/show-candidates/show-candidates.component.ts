import { Component, EventEmitter, Input, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '@candidate-app/shared';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { E } from '@angular/material/error-options.d-CGdTZUYk';

@Component({
  selector: 'show-candidates',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './show-candidates.component.html',
  styleUrl: './show-candidates.component.scss',
})
export class ShowCandidatesComponent {
  @Input() candidates!: WritableSignal<Candidate[]>;
  @Output() reset = new EventEmitter<void>();

  displayedColumns: string[] = ['name', 'surname', 'seniority', 'yearsOfExperience', 'availability'];

  resetData() {
    this.reset.emit();
  }
}
