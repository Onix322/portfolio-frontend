import {Component, Input} from '@angular/core';
import {GradientRectangle} from '../gradient-rectangle/gradient-rectangle';

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
}
