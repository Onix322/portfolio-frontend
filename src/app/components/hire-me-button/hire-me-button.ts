import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hire-me-button',
  imports: [],
  templateUrl: './hire-me-button.html',
  styleUrl: './hire-me-button.css'
})
export class HireMeButton {

  @Input() href: string = "";

}
