import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Window} from '../../util-com/window/window';
import {GradientRectangle} from '../../util-com/gradient-rectangle/gradient-rectangle';
import {Grabber} from '../../../service/grabber/grabber';
import {gsap} from 'gsap';
import CSSProperties = gsap.CSSProperties;
import {relative} from '@angular/compiler-cli';

@Component({
  selector: 'app-work',
  imports: [
    Window,
    GradientRectangle
  ],
  templateUrl: './work.html',
  styleUrl: './work.css'
})
export class Work implements AfterViewInit{

  @ViewChild('window', {read: ElementRef<HTMLElement>})
  private windowRef!: ElementRef<HTMLElement>

  private grabber: Grabber;

  constructor(grabber: Grabber) {
    this.grabber = grabber
  }

  ngAfterViewInit() {
    this.grabber.request<ElementRef<HTMLElement>>("windowGradient")
      .then((res) => {
        // the code for edit elements
        this.animateWindow(res.nativeElement)
      })
  }

  private animateWindow(window: HTMLElement) {
    const winRect = this.windowRef.nativeElement.getBoundingClientRect()

    gsap.to(window, {
      scrollTrigger: {
        scrub: true,
        pin: true,
        start: '10%',
        end: `30%`,
        markers: true
      },
      position: "relative",
      // pos - width - padding - border
      x: -winRect.x - (winRect.width + 22.5 + 4),
      y: winRect.y - winRect.height / 2 + 22.5 + 4,
      duration: 1
    })
  }
}
