import {AfterViewInit, Component, ElementRef, Injectable, ViewChild} from '@angular/core';
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

  @ViewChild("cursor")
  private cursorRef: ElementRef | undefined;
  private readonly cursor: MouseFollower;

  constructor() {
    MouseFollower.registerGSAP(gsap)
    this.cursor = new MouseFollower(this.settings);
  }

  ngAfterViewInit() {
    this.cursorInit()
  }

  public cursorInit() {
    let cursorSVG: HTMLElement = this.cursorRef?.nativeElement;

    document.body.classList.add("cursor-none")


    this.mouseOver();
    this.mouseClick(cursorSVG, ["-translate-1"]);

    this.cursor.setMedia(cursorSVG)
    this.cursor.container.firstChild?.before(this.cursor.el)
    this.cursor.el.classList = "absolute z-999"
  }

  private mouseOver(){
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

