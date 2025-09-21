import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Navigation} from '../../components/navigation/navigation';
import {gsap} from "gsap";

import {ScrollTrigger} from "gsap/ScrollTrigger";
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
  private scrollBy: number = 500 //px
  private duration: number = 0.2 //ms
  private rotationY = 15; //deg


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

    projects.forEach((project) => {
      if (this.current < 0) return
      gsap.to(project, {
        left: this.scrollBy * (0 - this.current),
        transitionDuration: this.duration,
        duration: this.duration,
        scrollTrigger: {
          trigger: project,
          start: 'left, right',
          end: "left 10%",
          scrub: true,
          onchange: ev => {
            console.log("change")
          }
        }
      })
    })

    if (event.deltaY > 0 && this.current < projects.length - 1) {
      this.current++
    }
    if (event.deltaY < 0 && this.current > -1) {
      this.rotationY = 0 - this.rotationY
      this.current--
    }
  }
}
