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

  @ViewChild("projectsContainer")
  private projectsContainerRef!: ElementRef
  protected num: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
  }

  ngAfterViewInit(): void {
    let native: HTMLElement = this.projectsContainerRef.nativeElement
    let children: HTMLCollectionOf<HTMLElement> = <HTMLCollectionOf<HTMLElement>>native.children
    let scrollBy = 500
    let index = 0;
    let leftSentence: string = "+=100";
    let lastTime = 0;
    const throttleDelay = 200; // ms

    const projects: Array<HTMLElement> = gsap.utils.toArray(children)

    native.addEventListener("wheel", (e) => {

      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      if (e.deltaY > 0 && index < projects.length - 1) {
        leftSentence = `-=${scrollBy}`
        index++
      }
      if (e.deltaY < 0 && index > -1) {
        leftSentence = `+=${scrollBy}`
        index--
      }

      projects.forEach((project) => {
        if (index < projects.length - 1 && index > -1) {
          gsap.to(project, {
            left: leftSentence,
            scrollTrigger: {
              trigger: project,
              start: 'left, right',
              end: "left 10%",
              scrub: true
            }
          })
        }
      })
    })
  }
}

//
// FIRST IDEA -----------
// native.onwheel = (e) => {
//   if (children.length < 1) return
//
//   console.log(lastChild.offsetLeft - lastChild.offsetWidth > 0)
//   console.log(firstChild.offsetLeft + firstChild.offsetWidth <= window.innerWidth)
//
//   if (e.deltaY > 0) {
//     scrollAt += scrollBy
//   } else {
//     scrollAt -= scrollBy
//   }
//   gsap.to(children, {
//     left: scrollAt,
//     duration: 0.02
//   })
// }
