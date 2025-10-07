import {Injectable} from '@angular/core';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollSmoother} from 'gsap/ScrollSmoother';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor() {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger)
  }

  public createSmoother(elements: ScrollElements) {
    gsap.set(elements.wrapper, {
      perspective: 1000,
      transformStyle: 'preserve-3d'
    })

    ScrollSmoother.create({
      wrapper: elements.wrapper,
      content: elements.content,
      speed: 1.5,
      smooth: 1.8,
      effects: true,
      onUpdate: self => {
        const velocity = self.getVelocity()
        gsap.set(self.content(), {
          transformOrigin: 'center center',
          skewY: gsap.utils.clamp(-5, 5, velocity / 500),
          filter: 'blur(' + gsap.utils.clamp(0, 5, Math.abs(velocity) / 200) + 'px)',
          duration: 1,
          ease: 'power4.in',
        })
      },
    })
  }
}

interface ScrollElements {
  wrapper: HTMLElement,
  content: HTMLElement
}

