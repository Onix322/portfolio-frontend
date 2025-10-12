import { Component } from '@angular/core';
import {GradientRectangle} from '../gradient-rectangle/gradient-rectangle';

@Component({
  selector: 'app-navigation',
  imports: [
    GradientRectangle
  ],
  templateUrl: './navigation.html',
})
export class Navigation {
  rectangleSettings: gsap.TweenVars = {
    width: 'fit-content',
    padding: "10px 30px 10px 30px",
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
  }
}
