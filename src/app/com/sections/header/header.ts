import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Chip} from '../../util-com/chip/chip';
import {Window} from '../../util-com/window/window';
import {Highlight} from 'ngx-highlightjs';
import {Ambient} from '../../util-com/ambient/ambient';
import {Grabber} from '../../../service/grabber/grabber';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-header',
  imports: [
    Chip,
    Window,
    Highlight,
    Ambient
  ],
  templateUrl: './header.html',
})
export class Header implements AfterViewInit {

  @ViewChild('windowGradient', {read: ElementRef<HTMLElement>})
  windowGradient!: ElementRef<HTMLElement>;
  @ViewChild('ambient', {read: Ambient})
  ambient!: Ambient;
  widowSettings: gsap.TweenVars = {
    width: 600,
    height: 500,
    boxShadow: '0 10px 100px 10px black',
    "--border-c": 'transparent'
  }
  protected code = `
  public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, world!");
      }
  }
  `;
  private grabber: Grabber

  constructor(grabber: Grabber) {
    this.grabber = grabber
  }

  ngAfterViewInit() {
    this.ambient.anchor.next(this.windowGradient)
    this.windowMoving(this.windowGradient)
    this.animateWindowContent()
  }

  private windowMoving(windowElement: ElementRef<HTMLElement>) {

    this.grabber.respond<ElementRef<HTMLElement>>('forWorkComponent', windowElement)
  }

  private animateWindowContent() {
    const defaultContent = this.code
    this.grabber.request<ElementRef<HTMLElement>>("forWindowComponent")
      .then((content) => {
        console.log(content)
        const native = content.nativeElement
        const tl = gsap.timeline({
          repeat: -1,
          // yoyo: true,
          delay: 1,
          defaults: {
            duration: 1.3,
            delay: 1,
          }
        })

        tl.to(native, {
          x: 100,
          opacity: 0,
          onStart: () => {
            this.code = defaultContent
          }
        })
          .to(native, {
            x: 0,
            opacity: 1,
            onStart: () => {
              this.code = "> Hello, World!"
            }
          })
          .to(native, {
            x: 100,
            opacity: 0,
            onComplete: () => {
              this.code = defaultContent
            }
          })
          .to(native, {
            x: 0,
            opacity: 1,
            onStart: () => {
              this.code = defaultContent
            }
          })
      })
  }
}
