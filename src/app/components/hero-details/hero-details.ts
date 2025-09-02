import {Component} from '@angular/core';
import {Line} from '../line/line';
import {HireMeButton} from '../hire-me-button/hire-me-button';

@Component({
  selector: 'app-hero-details',
  imports: [
    Line,
    HireMeButton
  ],
  templateUrl: './hero-details.html',
  styleUrl: './hero-details.css'
})
export class HeroDetails {

  protected readonly String = String;
}
