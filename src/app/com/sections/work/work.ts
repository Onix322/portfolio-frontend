import {Component} from '@angular/core';
import {Window} from '../../util-com/window/window';
import {GradientRectangle} from '../../util-com/gradient-rectangle/gradient-rectangle';

@Component({
  selector: 'app-work',
  imports: [
    Window,
    GradientRectangle,
  ],
  templateUrl: './work.html',
  styleUrl: './work.css'
})
export class Work {

}
