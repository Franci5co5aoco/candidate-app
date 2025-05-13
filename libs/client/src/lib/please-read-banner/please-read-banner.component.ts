import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'please-read-banner',
  imports: [
    CommonModule,
    MatExpansionModule,
  ],
  templateUrl: './please-read-banner.component.html',
  styleUrl: './please-read-banner.component.scss',
})
export class PleaseReadBannerComponent {}
