import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Navigation} from '../../components/navigation/navigation';
import {gsap} from "gsap";

import {ScrollTrigger} from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import {ScrollSmoother} from "gsap/ScrollSmoother";

@Component({
  selector: 'app-work',
  imports: [
    Navigation
  ],
  templateUrl: './work.html',
  styleUrl: './work.css'
})
export class Work implements OnInit, AfterViewInit {

  //animation prep
  @ViewChild("projectsContainer")
  private projectsContainerRef!: ElementRef
  private native: HTMLElement | undefined;

  //animation settings
  private scrollBy = 500

  //wheel events limit
  private wheelQueue: WheelEvent[] = [];
  private readonly MAX_QUEUE: number = 3;
  private processing: boolean = false;

  //test with objects
  protected num: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  private current: number = 0;

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
  }

  ngAfterViewInit() {
    this.native = this.projectsContainerRef.nativeElement;
    if(!this.native) return
    this.registerWheelRequest(this.native)
  }

  private registerWheelRequest(elementForListener: HTMLElement) {
    elementForListener.addEventListener("wheel", (e) => {
      if (this.wheelQueue.length >= this.MAX_QUEUE) {
        this.wheelQueue.shift();
      }
      this.wheelQueue.push(e);
      console.log(this.wheelQueue)
      this.processQueue(this.wheelQueue, elementForListener)
    })
  }

  private processQueue(queue: WheelEvent[], element: HTMLElement) {
    if (this.processing) return;
    this.processing = true;

    requestAnimationFrame(() => {
      const event = queue.shift();
      if (event) {
        this.handleWheel(element, event);
      }
      this.processing = false;

      if (queue.length > 0) {
        this.processQueue(queue, element);
      }
    });
  }

  private handleWheel(native: HTMLElement, event: WheelEvent) {
    let children: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>native.children
    const projects: Array<HTMLElement> = gsap.utils.toArray(children)

    console.log(this.current)

    if (event.deltaY > 0 && this.current < projects.length - 1) {
      this.current++
    }
    if (event.deltaY < 0 && this.current > -1) {
      this.current--
    }

    projects.forEach((project) => {
      gsap.to(project, {
        left: this.scrollBy * (-1 - this.current),
        scrollTrigger: {
          trigger: project,
          start: 'left, right',
          end: "left 10%",
          scrub: true
        },
        ease: "elastic",
        duration: 1000
      })
    })
  }

  // ngAfterViewInit(): void {
  //   let native: HTMLElement = this.projectsContainerRef.nativeElement
  //   let children: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>native.children
  //   let scrollBy = 500
  //   let index = 0;
  //   let leftSentence: string = "+=100";
  //   let lastTime = 0;
  //   const throttleDelay = 300; // ms
  //
  //   const projects: Array<HTMLElement> = gsap.utils.toArray(children)
  //
  //   native.addEventListener("wheel", (e) => {
  //
  //     const now = Date.now();
  //     if (now - lastTime < throttleDelay) {
  //       leftSentence = `-=${scrollBy}`
  //       return
  //     }
  //     lastTime = now;
  //
  //     if (e.deltaY > 0 && index < projects.length - 1) {
  //       leftSentence = `-=${scrollBy}`
  //       index++
  //     }
  //     if (e.deltaY < 0 && index > -1) {
  //       leftSentence = `+=${scrollBy}`
  //       index--
  //     }
  //
  //     projects.forEach((project) => {
  //       if (index < projects.length - 1 && index > -1) {
  //         gsap.to(project, {
  //           left: leftSentence,
  //           scrollTrigger: {
  //             trigger: project,
  //             start: 'left, right',
  //             end: "left 10%",
  //             scrub: true
  //           }
  //         })
  //       }
  //     })
  //   })
  // }
}
