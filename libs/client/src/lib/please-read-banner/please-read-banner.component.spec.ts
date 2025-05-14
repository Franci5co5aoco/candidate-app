/**
 * @jest-environment jsdom
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PleaseReadBannerComponent } from './please-read-banner.component';

describe('PleaseReadBannerComponent', () => {
  let component: PleaseReadBannerComponent;
  let fixture: ComponentFixture<PleaseReadBannerComponent>;

  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

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
