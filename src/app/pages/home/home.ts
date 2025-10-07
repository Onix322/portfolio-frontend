import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Header} from '../../com/sections/header/header';
import {Work} from '../../com/sections/work/work';
import {gsap} from 'gsap';
import {Grabber} from '../../service/grabber/grabber';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Work
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit{

  private grabber: Grabber;

  constructor(grabber: Grabber) {
    this.grabber = grabber
  }

  ngAfterViewInit(): void {
    this.grabber.request<ElementRef<HTMLElement>>("windowGradient")
      .then((res) => {
        // the code for edit elements
      })
  }
}
