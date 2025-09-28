import {Component, Input} from '@angular/core';
import {GradientRectangle} from '../gradient-rectangle/gradient-rectangle';
import {Chip} from '../chip/chip';

@Component({
  selector: 'app-header',
  imports: [
    GradientRectangle,
    Chip
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
