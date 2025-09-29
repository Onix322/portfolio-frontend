import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

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
