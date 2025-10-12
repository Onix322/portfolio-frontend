import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GradientRectangle} from '../../util-com/gradient-rectangle/gradient-rectangle';
import {Grabber} from '../../../service/grabber/grabber';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {CSSPlugin} from 'gsap/CSSPlugin';

type AnimationNeeds = {
  projects: HTMLElement,
  sectionDetails: HTMLElement,
  section: HTMLElement,
  who: HTMLElement,
}

@Component({
  selector: 'app-work',
  imports: [
    GradientRectangle,
  ],
  templateUrl: './work.html',
  styleUrl: './work.css'
})
export class Work implements AfterViewInit{

  @ViewChild('workDetails', {read: ElementRef<HTMLElement>})
  private workDetailsRef!: ElementRef<HTMLElement>

  @ViewChild('workSection', {read: ElementRef<HTMLElement>})
  private workSectionRef!: ElementRef<HTMLElement>

  @ViewChild('workSectionProjects', {read: ElementRef<HTMLElement>})
  private workSectionProjectsRef!: ElementRef<HTMLElement>

  private grabber: Grabber;

  rectangleSettings: gsap.TweenVars = {
    width: '100%',
    height: 500
  }

  constructor(grabber: Grabber) {
    gsap.registerPlugin(ScrollTrigger, CSSPlugin)
    this.grabber = grabber
  }

  ngAfterViewInit() {
    const workSectionProjects = this.workSectionProjectsRef.nativeElement
    const section = this.workSectionRef.nativeElement
    const workDetails = this.workDetailsRef.nativeElement

    this.grabber.request<ElementRef<HTMLElement>>("forWorkComponent")
      .then((window) => {
        const needs: AnimationNeeds = {
          projects: workSectionProjects,
          section: section,
          sectionDetails: workDetails,
          who: window.nativeElement,
        }
        this.animateWorkSectionProjectsChildren(needs)
      })
  }

  private animateWorkSectionProjectsChildren(needs: AnimationNeeds) {

    const children = Array.from(needs.projects.children)

    let whereRect = needs.section.getBoundingClientRect()
    let whoRect = needs.who.getBoundingClientRect()

    children.forEach(child => {
      const childRect = child.getBoundingClientRect()

      gsap.set(child, {
        x: 100,
        opacity: 0,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: child,
          start: "center 70%",
          end: "100% 60%",
          scrub: true,
          markers: false,
        },
        defaults: {
          ease: "power4.out",
          delay: 1,
          duration: 40
        },
      })

      tl.to(needs.who, {
        x: -whoRect.x + whereRect.x,
        y: (childRect.y - (childRect.height / 2)) - (whoRect.y - (whoRect.height / 2)),
        opacity: 1,
        zIndex: 999
      }).to(child, {
        x: 0,
        opacity: 1,
      })

    })
  }
}
