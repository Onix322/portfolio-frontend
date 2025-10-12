import {AfterViewInit, Component, ElementRef, Input, ViewChild, viewChild} from '@angular/core';
import {GradientRectangle} from '../gradient-rectangle/gradient-rectangle';
import {Grabber} from '../../../service/grabber/grabber';

@Component({
  selector: 'app-window',
  imports: [
    GradientRectangle
  ],
  templateUrl: './window.html',
  styleUrl: './window.css'
})
export class Window implements AfterViewInit{

  @Input()
  settings: gsap.TweenVars = {
    width: 100,
  };

  @ViewChild("windowContent", {read: ElementRef<HTMLElement>})
  protected windowContent!: ElementRef<HTMLElement>;
  private grabber: Grabber;

  constructor(grabber: Grabber) {
    this.grabber = grabber
  }

  ngAfterViewInit(): void {
    this.grabber.respond<ElementRef<HTMLElement>>('forWindowComponent', this.windowContent)
  }
}
