import {Injectable} from '@angular/core';
import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollSmoother} from 'gsap/ScrollSmoother';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private position: ScrollPosition;

  constructor() {
    this.position = {
      x: 0,
      y: 0
    }
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin)
  }

  public scroll(forElement: HTMLElement | Window) {
    const rectBody: DOMRect = document.body.getBoundingClientRect()

    forElement.addEventListener("wheel", (we) => {
      const weCast = <WheelEvent>we

      this.position.y += weCast.deltaY;
      this.position.y = Math.max(0, Math.min(this.position.y, rectBody.height - window.innerHeight));

      requestAnimationFrame(() => {
        gsap.to(forElement, {
          scrollTo:{
            y: this.position.y,
          },
          overwrite: true,
          duration: 0.5,
          ease: "power4.out"
        })
      })
    })
  }
}

interface ScrollPosition {
  x: number,
  y: number
}
