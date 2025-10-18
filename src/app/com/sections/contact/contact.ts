import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Window} from "../../util-com/window/window";
import {gsap} from 'gsap';
import {Grabber} from '../../../service/grabber/grabber';

@Component({
  selector: 'app-contact',
  imports: [
    Window
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements AfterViewInit {

  windowSettings: gsap.TweenVars = {
    "--border-c": 'transparent',
  }
  @ViewChild("contactSection", {read: ElementRef<HTMLElement>})
  private contactSection!: ElementRef<HTMLElement>
  @ViewChild("contactDetails", {read: ElementRef<HTMLElement>})
  private contactDetails!: ElementRef<HTMLElement>
  @ViewChild("contactFrom", {read: ElementRef<HTMLElement>})
  private contactFrom!: ElementRef<HTMLElement>

  constructor(private grabber: Grabber) {

  }

  ngAfterViewInit() {
    this.grabber.respond<ElementRef<HTMLElement>>('forNavigationContactButton', this.contactSection)

    const section = this.contactSection.nativeElement
    const details = this.contactDetails.nativeElement
    const form = this.contactFrom.nativeElement

    const sectionRect = section.getBoundingClientRect()

    console.log(sectionRect)

  }
}
