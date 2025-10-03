import { Component } from '@angular/core';
import {GradientRectangle} from '../gradient-rectangle/gradient-rectangle';

@Component({
  selector: 'app-window',
  imports: [
    GradientRectangle
  ],
  templateUrl: './window.html',
  styleUrl: './window.css'
})
export class Window {

}
