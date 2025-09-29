import {Component} from '@angular/core';
import {Chip} from '../chip/chip';
import {Window} from '../window/window';

@Component({
  selector: 'app-header',
  imports: [
    Chip,
    Window
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
