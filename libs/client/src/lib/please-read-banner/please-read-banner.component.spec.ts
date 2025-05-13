import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PleaseReadBannerComponent } from '../please-read-banner.component';

describe('PleaseReadBannerComponent', () => {
  let component: PleaseReadBannerComponent;
  let fixture: ComponentFixture<PleaseReadBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PleaseReadBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PleaseReadBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
