import {Component, Input} from '@angular/core';
import {GradientRectangle} from '../gradient-rectangle/gradient-rectangle';
import {gsap} from 'gsap';

@Component({
  selector: 'app-chip',
  imports: [
    GradientRectangle
  ],
  templateUrl: './chip.html',
  styleUrl: './chip.css'
})
export class Chip {
  @Input()
  text: string = ""

  rectangleSettings: gsap.TweenVars ={
    padding: 10,
    placeItems: 'center',
    width: 100
  }
}
