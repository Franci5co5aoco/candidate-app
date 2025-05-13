import { Route } from '@angular/router';
import { CandidatesComponent } from './pages/candidates/candidates.component';

export const appRoutes: Route[] = [
    { path: 'candidates', component: CandidatesComponent },
    { path: '', redirectTo: '/candidates', pathMatch: 'full' },
    { path: '**', redirectTo: '/candidates', pathMatch: 'full' },
];
