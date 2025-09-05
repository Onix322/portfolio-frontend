import {Component, Input} from '@angular/core';
import {Button} from '../button';

@Component({
  selector: 'app-hire-me-button',
  imports: [
    Button
  ],
  templateUrl: './hire-me-button.html',
  styleUrl: './hire-me-button.css'
})
export class HireMeButton {

  @Input() href: string = "";

}
