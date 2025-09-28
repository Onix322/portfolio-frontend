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
  classes: string[] = [];

  constructor() {
  }

  ngAfterViewInit(): void {
    const rectangle: HTMLElement = this.rectangleRef.nativeElement
    rectangle.style.width = this.width == 0 ? "fit-content" : `${this.width}px`
    rectangle.style.height = this.height == 0 ? "fit-content" : `${this.height}px`
    rectangle.style.padding = this.padding == 0 ? "0" : `${this.padding}px`

    this.classes.forEach(c => rectangle.classList.add(c))
  }
}
