import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {

  @Input() href: string = "";
  @Input() text: string = "";

  @Input() tabIndex = 0;
  static index= 0;
  constructor() {
    Button.index++
    this.tabIndex = Button.index;
  }
}
