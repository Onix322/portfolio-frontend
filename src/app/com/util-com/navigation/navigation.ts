import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GradientRectangle} from '../gradient-rectangle/gradient-rectangle';
import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import {Grabber} from '../../../service/grabber/grabber';

type AppSections = {
  container: HTMLElement | null,
  work: HTMLElement | null,
  contact: HTMLElement | null,
};

type NavButtons = {
  work: HTMLElement | null,
  contact: HTMLElement | null,
};

@Component({
  selector: 'app-navigation', imports: [GradientRectangle], templateUrl: './navigation.html',
})
export class Navigation implements AfterViewInit {
  rectangleSettings: gsap.TweenVars = {
    width: 'fit-content',
    padding: "0 10px",
  }

  @ViewChild('workButton', {read: ElementRef<HTMLElement>}) private workButton!: ElementRef<HTMLElement>;
  @ViewChild('contactButton', {read: ElementRef<HTMLElement>}) private contactButton!: ElementRef<HTMLElement>;

  private grabber: Grabber;
  protected sections: AppSections = {
    work: null,
    contact: null,
    container: null
  };

  constructor(grabber: Grabber) {
    this.grabber = grabber
    gsap.registerPlugin(ScrollToPlugin)
  }

  async ngAfterViewInit() {
    const workNative = this.workButton.nativeElement
    const contactNative = this.contactButton.nativeElement
    const buttons: NavButtons = {
      work: workNative,
      contact: contactNative
    }
    this.sections = await this.grabNecessities()

    this.applyAnimation(this.sections, buttons)
  }

  private applyAnimation(sections: AppSections, buttons: NavButtons) {
    for (const buttonKey of Object.keys(buttons) as (keyof NavButtons)[]) {
      const button = buttons[buttonKey]
      console.log()
      button?.addEventListener('click', () => {
        const sectionDataHref = button?.attributes.getNamedItem('data-href')?.value
        if(!sectionDataHref) {
          console.error("Attr 'data-href' used for scrolling is not defined")
          return
        }
        const sectionKey = Object.keys(sections).find(k => k == sectionDataHref) as (keyof AppSections)
        if(!sectionKey) {
          console.error("No section found.")
          return
        }

        const sectionBounds = sections[sectionKey]!.getBoundingClientRect();

        gsap.to(window, {
          scrollTo: {
            y: (sectionBounds.top - sectionBounds.height / 2) - window.scrollY,
          }
        })

      })
    }
  }

  private async grabNecessities() {
    let sections: AppSections = {
      container: null, work: null, contact: null,
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
        return sections
      })
      .catch(err => {
        console.error(err)
        return sections
      })
  }
}
