import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Chip} from '../../util-com/chip/chip';
import {Window} from '../../util-com/window/window';
import {Highlight} from 'ngx-highlightjs';
import {Ambient} from '../../util-com/ambient/ambient';

@Component({
  selector: 'app-header',
  imports: [
    Chip,
    Window,
    Highlight,
    Ambient
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements AfterViewInit{

  @ViewChild('windowGradient', { read: ElementRef<HTMLElement> })
  windowGradient!: ElementRef<HTMLElement>;
  @ViewChild('ambient', { read: Ambient })
  ambient!: Ambient;

  code = `
  public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, world!");
      }
  }
  `;

  ngAfterViewInit() {
    this.ambient.anchor.next(this.windowGradient)
    console.log(this.windowGradient)
  }
}
