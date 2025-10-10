import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Window} from '../../util-com/window/window';
import {GradientRectangle} from '../../util-com/gradient-rectangle/gradient-rectangle';
import {Grabber} from '../../../service/grabber/grabber';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {CSSPlugin} from 'gsap/CSSPlugin';
import {ScrollService} from '../../../service/scroll/scroll-service';

@Component({
  selector: 'app-work',
  imports: [
    Window,
    GradientRectangle
  ],
  templateUrl: './work.html',
  styleUrl: './work.css'
})
export class Work implements AfterViewInit{

  @ViewChild('workDetails', {read: ElementRef<HTMLElement>})
  private workDetails!: ElementRef<HTMLElement>


  @ViewChild('workSection', {read: ElementRef<HTMLElement>})
  private workSectionRef!: ElementRef<HTMLElement>

  @ViewChild('workSectionProjects', {read: ElementRef<HTMLElement>})
  private workSectionProjectsRef!: ElementRef<HTMLElement>

  private grabber: Grabber;
  private scrollService: ScrollService;

  constructor(grabber: Grabber, scrollService: ScrollService) {
    gsap.registerPlugin(ScrollTrigger, CSSPlugin)
    this.grabber = grabber
    this.scrollService = scrollService
  }

  ngAfterViewInit() {
    const workSection = this.workSectionRef.nativeElement
    const workSectionProjects = this.workSectionProjectsRef.nativeElement

    this.grabber.request<ElementRef<HTMLElement>>("windowGradient")
      .then((window) => {
        this.animateWindow(window.nativeElement)
        this.animateWorkSectionProjectsChildren(workSectionProjects, window.nativeElement)
      })

  }

  //rethink
  private animateWindow(window: HTMLElement) {
    const workDetailsRect = this.workDetails.nativeElement.getBoundingClientRect()
    const winRect = window.getBoundingClientRect()
    // pos - width - padding - border
    const heightMiddle = (winRect.height / 2 - 22.5 - 4)
    const widthMiddle = (winRect.width + 22.5 + 4)

    // gsap.to(window, {
    //   scrollTrigger: {
    //     scrub: true,
    //     pin: true,
    //     start: 'top',
    //     end: `bottom bottom`,
    //     markers: false
    //   },
    //   position: "relative",
    //   x: -winRect.x - widthMiddle,
    //   y: winRect.y - heightMiddle,
    //   duration: 1,
    //   filter: 'none',
    //   zIndex: 99
    // })
  }

  private animateWorkSectionProjectsChildren(workSectionProjects: HTMLElement, window: HTMLElement) {

    const children = Array.from(workSectionProjects.children)

    const workDetailsRect = this.workDetails.nativeElement.getBoundingClientRect()
    const winRect = window.getBoundingClientRect()
    const heightMiddle = (winRect.height / 2 - 22.5 - 4)
    const widthMiddle = (winRect.width + 22.5 + 4)


    children.forEach(child => {
      gsap.set(child, {
        x: 100,
        opacity: 0,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: child,
          start: "top 60%",
          end: "bottom 30%",
          scrub: true,
          markers: true,
        },
        defaults: {
          ease: "power4.out",
          delay: 1,
          duration: 10
        },
      })

      tl.to(window, {
        x: -(workDetailsRect.x) - widthMiddle,
        y: child.getBoundingClientRect().y - heightMiddle,
        opacity: 1,
      }).to(child, {
        x: 0,
        opacity: 1,
      }).to(child, {
        x: 100,
        opacity: 0,
      }).to(window, {
        scrollTrigger: {
          trigger: children[children.length - 1],
          markers: false,
          scrub: true,
          start: "top 15%",
          end: "top 0%"
        },
        opacity: 0,
        rotateZ: -20,
        display: 'none',
        position: 'relative',
        left: -100,
      }).to(children[children.length - 1], {
        scrollTrigger: {
          trigger: children[children.length - 1],
          markers: false,
          scrub: true,
          start: "top 15%",
          end: "top 0%"
        },
        rotateZ: 20,
      })
    })
  }
}
