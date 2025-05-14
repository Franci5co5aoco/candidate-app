import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowCandidatesComponent } from './show-candidates.component';
import { Component, signal, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  imports: [ShowCandidatesComponent],
  template: `
      <show-candidates
        [candidates]="candidates"
        (reset)="onReset()($event)">
      </show-candidates>`
})
class HostComponent {
  @ViewChild(ShowCandidatesComponent) showCandidatesComponent!: ShowCandidatesComponent;
  candidates = signal([
    { name: 'John', surname: 'Doe', seniority: 'junior', yearsOfExperience: 2, availability: 'immediate' },])
 
  isReset = false;
  onReset() {
    this.isReset = true;
  };
}

describe('ShowCandidatesComponent', () => {
  let hostComponent: HostComponent;
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCandidatesComponent, HostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent.showCandidatesComponent).toBeTruthy();
  });

  describe('resetData', () => {
    it('should emit reset event', () => {
      const resetSpy = jest.spyOn(hostComponent, 'onReset');
      hostComponent.showCandidatesComponent.resetData();
      expect(resetSpy).toHaveBeenCalled();
    });
  });
});
