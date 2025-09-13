import {AfterViewInit, Component, ElementRef, Injectable, ViewChild, ViewChildren} from '@angular/core';
import gsap from "gsap";
import MouseFollower from 'mouse-follower';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.html',
  styleUrl: './cursor.css'
})
export class Cursor implements AfterViewInit{

  //for documentation https://github.com/Cuberto/mouse-follower
  private settings: any = {
    speed: 0.55
  }

  @ViewChild("cursor", {read: ElementRef})
  private cursorSVGRef: ElementRef | undefined;

  private readonly cursor: MouseFollower;

  constructor() {
    MouseFollower.registerGSAP(gsap)
    this.cursor = new MouseFollower(this.settings);
  }

  ngAfterViewInit() {
    this.cursorInit(this.cursor)
  }

  public cursorInit(cursor: MouseFollower) {
    let cursorSVG: HTMLElement = this.cursorSVGRef?.nativeElement;

    document.body.classList.add("cursor-none")

    this.mouseAppearance();
    this.mouseClick(cursorSVG, ["-translate-1"]);

    cursor.setMedia(cursorSVG)
    cursor.container.firstChild?.before(this.cursor.el)
    cursor.el.classList = "absolute z-999"
  }

  private mouseAppearance(){
    document.body.onmouseenter = ()=> {
      this.cursor.show()
    }
    document.body.onmouseleave = ()=> {
      this.cursor.hide()
    }
  }

  private mouseClick(cursorSVG: HTMLElement, className: string[]): void{
    document.body.onmousedown = ()=> {
      cursorSVG.style.scale = "0.8"
      className.forEach((cn) => {
        cursorSVG.classList.add(cn)
      })
    }
    document.body.onmouseup = ()=> {
      cursorSVG.style.scale = "1"
      className.forEach((cn) => {
        cursorSVG.classList.remove(cn)
      })
    }
  }
}

