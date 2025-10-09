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

  @ViewChild('window', {read: ElementRef<HTMLElement>})
  private windowRef!: ElementRef<HTMLElement>

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
      })

    this.animateWorkSectionProjectsChildren(workSectionProjects)
  }

  private animateWindow(window: HTMLElement) {
    const winRect = this.windowRef.nativeElement.getBoundingClientRect()

    gsap.to(window, {
      scrollTrigger: {
        scrub: true,
        pin: true,
        start: 'top',
        end: `bottom bottom`,
        markers: false
      },
      position: "relative",
      // pos - width - padding - border
      x: -winRect.x - (winRect.width + 22.5 + 4),
      y: winRect.y - winRect.height / 2 + 22.5 + 4,
      duration: 1,
      filter: 'none',
      zIndex: 99
    })
  }

  private animateWorkSectionProjectsChildren(workSectionProjects: HTMLElement) {

    const children = Array.from(workSectionProjects.children)

    children.forEach(child => {
      gsap.set(child, {
        x: 100,
        opacity: 0,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: child,
          start: "top 70%",
          end: "bottom 40%",
          scrub: true,
          markers: true,
        }
      })

      tl.to(child, {
        x: 0,
        opacity: 1,
        ease: "power4.out",
        duration: 1,
      }).to(child, {
        x: 100,
        opacity: 0,
        ease: "power4.in",
        duration: 1,
      })
    })
  }
}
