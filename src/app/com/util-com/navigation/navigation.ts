import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GradientRectangle} from '../gradient-rectangle/gradient-rectangle';
import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import {Grabber} from '../../../service/grabber/grabber';

type AppSections = {
  container: HTMLElement | null,
  work: HTMLElement | null,
  header: HTMLElement | null,
  contact: HTMLElement | null,
};

type NavButtons = {
  work: HTMLElement | null,
  contact: HTMLElement | null,
  arrow: HTMLElement | null,
};

@Component({
  selector: 'app-navigation', imports: [GradientRectangle], templateUrl: './navigation.html',
})
export class Navigation implements AfterViewInit {
  navSettings: gsap.TweenVars = {
    width: 'fit-content',
    height: '100% !important',
    padding: "0 10px",
  }

  upArrowSettings: gsap.TweenVars = {
    padding: "0 10px",
  }
  protected sections: AppSections = {
    work: null,
    contact: null,
    container: null,
    header: null
  };
  @ViewChild('workButton', {read: ElementRef<HTMLElement>})
  private workButton!: ElementRef<HTMLElement>;
  @ViewChild('contactButton', {read: ElementRef<HTMLElement>})
  private contactButton!: ElementRef<HTMLElement>;
  @ViewChild('arrowButton', {read: ElementRef<HTMLElement>})
  private arrowButton!: ElementRef<HTMLElement>;

  constructor(private grabber: Grabber) {
    this.grabber = grabber
    gsap.registerPlugin(ScrollToPlugin)
  }

  async ngAfterViewInit() {
    const workNative = this.workButton.nativeElement
    const contactNative = this.contactButton.nativeElement
    const arrowNative = this.arrowButton.nativeElement
    const buttons: NavButtons = {
      work: workNative,
      contact: contactNative,
      arrow: arrowNative
    }
    this.sections = await this.grabNecessities()

    this.animateArrowButton(buttons)
    this.applyAnimation(this.sections, buttons)
  }

  private animateArrowButton(buttons: NavButtons) {
    if (!buttons.arrow?.parentElement) return

    const tl = gsap.timeline()

    gsap.set(buttons.arrow?.parentElement, {
      transitionDuration: 0.2,
      position: 'absolute',
      top: '50%',
      right: buttons.arrow.getBoundingClientRect().width - 10,
      translateY: '-50%',
      opacity: 0,
      zIndex: -999
    })

    tl.from(buttons.arrow?.parentElement, {
      transitionDelay: 0.2,
      opacity: 0
    })
      .to(buttons.arrow?.parentElement, {
        opacity: 1,
        transitionDelay: 0.5,
      })
      .to(buttons.arrow?.parentElement, {
        scrollTrigger: {
          scrub: true,
          markers: false,
          start: "10% top",
          end: "12% 10%"
        },
        transitionDelay: 0.5,
        position: 'absolute',
        right: -buttons.arrow.getBoundingClientRect().width - 20,
        zIndex: 999
    })
  }

  private applyAnimation(sections: AppSections, buttons: NavButtons) {
    for (const buttonKey of Object.keys(buttons) as (keyof NavButtons)[]) {
      const button = buttons[buttonKey]
      button?.addEventListener('click', (e) => {
        const sectionDataHref = button?.attributes.getNamedItem('data-href')?.value
        if (!sectionDataHref) {
          console.error("Attr 'data-href' used for scrolling is not defined")
          return
        }
        const sectionKey = Object.keys(sections).find(k => k == sectionDataHref) as (keyof AppSections)
        if (!sectionKey) {
          console.error("No section found.")
          return
        }

        gsap.to(window, {
          scrollTo: {
            y: sections[sectionKey]?.offsetTop
          },
        })
      })
    }
  }

  private async grabNecessities() {
    let sections: AppSections = {
      container: null,
      work: null,
      contact: null,
      header: null
    }

    return await this.grabber.request<ElementRef<HTMLElement>>("forNavigationContainer")
      .then(container => {
        sections.container = container.nativeElement
        return this.grabber.request<ElementRef<HTMLElement>>("forNavigationWorkButton")
      })
      .then(workSection => {
        sections.work = workSection.nativeElement
        return this.grabber.request<ElementRef<HTMLElement>>("forNavigationContactButton")
      })
      .then(contactSection => {
        sections.contact = contactSection.nativeElement
        return this.grabber.request<ElementRef<HTMLElement>>("forNavigationArrowButton")
      })
      .then(headerSection => {
        sections.header = headerSection.nativeElement
        return sections
      })
      .catch(err => {
        console.error(err)
        return sections
      })
  }
}
