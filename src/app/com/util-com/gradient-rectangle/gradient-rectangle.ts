import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {gsap} from 'gsap';

@Component({
  selector: 'app-gradient-rectangle',
  imports: [],
  templateUrl: './gradient-rectangle.html',
  styleUrl: './gradient-rectangle.css'
})
export class GradientRectangle implements AfterViewInit {

  @ViewChild("gradientRectangle", {read: ElementRef})
  private rectangleRef!: ElementRef;

  @Input()
  deg: number = NaN;
  @Input()
  settings: gsap.TweenVars = {
    width: 10,
    height : 10,
    duration: 1,
  };

  constructor() {
  }

  ngAfterViewInit(): void {
    const rectangle: HTMLElement = this.rectangleRef.nativeElement
    this.borderAnimation(rectangle)
    this.setProperties(this.settings)
  }

  private setProperties(properties: gsap.TweenVars){
    const rectangle: HTMLElement = this.rectangleRef.nativeElement
    gsap.set(rectangle, properties)
  }

  private borderAnimation(rectangle: HTMLElement){

    rectangle.onmousemove = (e) =>{
      const rect = rectangle.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const x = e.clientX;
      const y = e.clientY;

      let angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      if (angle < 0) angle += 360;
      angle = (angle + 90) % 360;

      rectangle.style.setProperty("--border-d", `${angle}deg`);
    }
  }
}
