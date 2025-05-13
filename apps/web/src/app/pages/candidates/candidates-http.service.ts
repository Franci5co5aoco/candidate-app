import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Candidate } from '@candidate-app/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidatesHttpService {
  private http = inject(HttpClient);

  postCandidate(formData: FormData): Observable<Candidate> {
    return this.http.post<Candidate>('http://localhost:3000/api/candidates', formData);
  }
}
