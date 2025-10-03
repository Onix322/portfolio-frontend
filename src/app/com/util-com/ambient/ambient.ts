import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {gsap} from "gsap";
import {Subject} from 'rxjs';

@Component({
  selector: 'app-ambient',
  imports: [],
  templateUrl: './ambient.html',
  styleUrl: './ambient.css'
})
export class Ambient implements AfterViewInit {

  @ViewChild("ambient", {read: ElementRef<HTMLElement>})
  private ambientRef!: ElementRef<HTMLElement>;
  @Input()
  public animate: boolean = false;
  private _anchor: Subject<ElementRef<HTMLElement>> = new Subject()

  private animationSettings = {
    duration: 2,
    increaseBy: 2,
    diffX: 50, //px
    diffY: 100, //px
    ease: "power1.inOut"
  }

  constructor() {
  }

  get anchor(): Subject<ElementRef<HTMLElement>> {
    return this._anchor;
  }

  ngAfterViewInit(): void {
    const ambient: HTMLElement = this.ambientRef.nativeElement
    this.setAnchor(ambient)
    this.toggleAnimation(this.animate, ambient)
  }

  private setAnchor(ambient: HTMLElement) {
    this.anchor.subscribe({
      next: (an) => {
        if (an == null) return
        const rectAnchor = an.nativeElement.getBoundingClientRect()

        ambient.style.top = (rectAnchor.top - rectAnchor.height)+'px'
        ambient.style.left = (rectAnchor.left - rectAnchor.width * 2) - 60 +'px'
      }
    })
  }

  private toggleAnimation(state: boolean, element: HTMLElement) {
    if (!state) return
    const timeline = gsap.timeline({
      repeat: -1,
    })

    const elLeft = element.clientLeft - element.clientWidth / 2
    const elTop = element.clientTop - element.clientHeight / 2

    gsap.from(element, {
      left: elLeft - this.animationSettings.diffY,
      top: elTop - this.animationSettings.diffX
    })
    timeline.to(element, {
      left: elLeft + this.animationSettings.diffY,
      top: elTop - this.animationSettings.diffX,
      duration: this.animationSettings.duration,
      ease: this.animationSettings.ease
    })

    timeline.to(element, {
      left: elLeft + this.animationSettings.diffY,
      top: elTop - this.animationSettings.diffX,
      duration: this.animationSettings.duration,
      ease: this.animationSettings.ease
    })
      .to(element, {
        left: elLeft + this.animationSettings.diffY,
        top: elTop + this.animationSettings.diffX,
        duration: this.animationSettings.duration,
        ease: this.animationSettings.ease
      })
      .to(element, {
        left: elLeft - this.animationSettings.diffY,
        top: elTop + this.animationSettings.diffX,
        duration: this.animationSettings.duration,
        ease: this.animationSettings.ease
      })
      .to(element, {
        left: elLeft - this.animationSettings.diffY,
        top: elTop - this.animationSettings.diffX,
        duration: this.animationSettings.duration,
        ease: this.animationSettings.ease
      })
  }
}
