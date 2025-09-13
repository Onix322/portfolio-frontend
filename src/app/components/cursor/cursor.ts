import {AfterViewInit, Component, ElementRef, Injectable, ViewChild} from '@angular/core';
import gsap from "gsap";
import MouseFollower from 'mouse-follower';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.html',
  styleUrl: './cursor.css'
})
export class Cursor implements AfterViewInit{

  @ViewChild("cursor")
  private cursorRef: ElementRef | undefined;
  private readonly cursor: MouseFollower;

  constructor() {
    MouseFollower.registerGSAP(gsap)
    this.cursor = new MouseFollower();
  }

  ngAfterViewInit() {
    this.cursorInit()
  }

  public cursorInit() {
    let cursorSVG: HTMLElement = this.cursorRef?.nativeElement;

    document.body.classList.add("cursor-none")

    document.body.onmousedown = ()=> {
      cursorSVG.style.scale = "0.8"
    }
    document.body.onmouseup = ()=> {
      cursorSVG.style.scale = "1"
    }
    this.cursor.show()
    this.cursor.setMedia(cursorSVG)
    this.cursor.container.firstChild?.before(this.cursor.el)
    this.cursor.el.classList = "absolute z-999"
  }
}

