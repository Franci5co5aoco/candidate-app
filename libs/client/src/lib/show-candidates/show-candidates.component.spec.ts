import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowCandidatesComponent } from './show-candidates.component';

describe('ShowCandidatesComponent', () => {
  let component: ShowCandidatesComponent;
  let fixture: ComponentFixture<ShowCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCandidatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
