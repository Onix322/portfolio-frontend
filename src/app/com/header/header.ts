import {Component} from '@angular/core';
import {Chip} from '../chip/chip';
import {Window} from '../window/window';
import {Highlight} from 'ngx-highlightjs';

@Component({
  selector: 'app-header',
  imports: [
    Chip,
    Window,
    Highlight
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  code = `
  public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, world!");
      }
  }
  `;

}
