import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cursor',
  imports: [],
  templateUrl: './cursor.html',
  styleUrl: './cursor.css'
})
export class Cursor implements AfterViewInit {

  @ViewChild("cursor")
  cursorRef: ElementRef | undefined;

  ngAfterViewInit(): void {
    if (!this.cursorRef) return;

    let cursor: HTMLElement = this.cursorRef.nativeElement;
    document.body.style.cursor = "none"


    window.addEventListener("mousemove", (e) => {
      setTimeout(() => {
        cursor.style.left = `${e.x - cursor.clientWidth / 2}px`
        cursor.style.top = `${e.y - cursor.clientHeight / 2}px`
      }, 100)
    })

    document.addEventListener("click", (e) => {
      // MAKE ANIMATION FOR CLICK
    })
  }
}
