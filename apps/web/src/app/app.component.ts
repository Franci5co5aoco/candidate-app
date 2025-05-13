import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CandidatesComponent } from './pages/candidates/candidates.component';

@Component({
  imports: [NxWelcomeComponent, RouterModule, CandidatesComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web';
}
