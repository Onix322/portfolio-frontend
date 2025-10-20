import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Header} from '../../com/sections/header/header';
import {Work} from '../../com/sections/work/work';
import {Contact} from '../../com/sections/contact/contact';
import {Grabber} from '../../service/grabber/grabber';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Work,
    Contact
  ],
  templateUrl: './home.html',
})
export class Home implements AfterViewInit{

  @ViewChild(Contact, {read: ElementRef<HTMLElement>})
  private contact!: ElementRef<HTMLElement>
  @ViewChild(Work, {read: ElementRef<HTMLElement>})
  private work!: ElementRef<HTMLElement>
  @ViewChild(Header, {read: ElementRef<HTMLElement>})
  private header!: ElementRef<HTMLElement>

  constructor(private grabber: Grabber) {
  }

  ngAfterViewInit() {
    this.grabber.respond<ElementRef<HTMLElement>>('forNavigationContactButton', this.contact)
    this.grabber.respond<ElementRef<HTMLElement>>('forNavigationWorkButton', this.work)
    this.grabber.respond<ElementRef<HTMLElement>>('forNavigationArrowButton', this.header)
  }
}
