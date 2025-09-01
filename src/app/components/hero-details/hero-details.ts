import {Component} from '@angular/core';
import {Line} from '../line/line';

@Component({
  selector: 'app-hero-details',
  imports: [
    Line
  ],
  templateUrl: './hero-details.html',
  styleUrl: './hero-details.css'
})
export class HeroDetails {

  protected readonly String = String;
}
