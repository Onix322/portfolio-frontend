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
  width: number = 0;
  @Input()
  height: number = 0;
  @Input()
  padding: number = 0;
  @Input()
  borderWidth: number = NaN;
  @Input()
  deg: number = NaN;
  @Input()
  classes: string[] = [];

  constructor() {
  }

  ngAfterViewInit(): void {
    const rectangle: HTMLElement = this.rectangleRef.nativeElement
    this.initProperties(rectangle)
    this.borderAnimation(rectangle)
  }

  private initProperties( rectangle: HTMLElement){
    rectangle.style.width = this.width == 0 ? "fit-content" : `${this.width}px`
    rectangle.style.height = this.height == 0 ? "fit-content" : `${this.height}px`
    rectangle.style.padding = this.padding == 0 ? "0" : `${this.padding}px`

    this.classes.forEach(c => {
      if (c.trim() == '') return
      rectangle.classList.add(c)
    })

    if (!isNaN(this.deg)) {
      setProperty(rectangle, "--linear-opacity-gradient-color", this.deg.toString(), '\d+[deg]+')
    }

    if (!isNaN(this.borderWidth)) {
      setProperty(rectangle, "--border-w", this.borderWidth.toString() + 'px', '')
    }
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

function setProperty(element: HTMLElement, property: string, value: string, findAndReplace: string) {
  if (findAndReplace.trim() == '') {
    element.style.setProperty(property, value)
    return;
  }

  const regex = new RegExp(findAndReplace)
  const computedStyle = window.getComputedStyle(element)
    .getPropertyValue(property)
  const newComputedStyle = computedStyle.replace(regex, `${value}deg`)
  element.style.setProperty(property, newComputedStyle)
  return newComputedStyle
}
