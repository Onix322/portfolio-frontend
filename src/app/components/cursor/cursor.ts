import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import gsap from "gsap";
import MouseFollower from 'mouse-follower';
import {Sender} from '../../service/sender/sender';
import {SenderEntry} from '../../service/sender/SenderEntry';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.html',
  styleUrl: './cursor.css'
})
export class Cursor implements AfterViewInit {
  //Mouse Follower
  //for documentation https://github.com/Cuberto/mouse-follower
  private settings: any = {
    el: null,
    container: document.body,
    className: 'mf-cursor',
    innerClassName: 'mf-cursor-inner',
    textClassName: 'mf-cursor-text',
    mediaClassName: 'mf-cursor-media',
    mediaBoxClassName: 'mf-cursor-media-box',
    iconSvgClassName: 'mf-svgsprite',
    iconSvgNamePrefix: '-',
    iconSvgSrc: '',
    dataAttr: 'cursor',
    hiddenState: '-hidden',
    textState: '-text',
    iconState: '-icon',
    activeState: '-active',
    mediaState: '-media',
    stateDetection: {
      '-pointer': 'a,button',
      '-hidden': 'iframe'
    },
    visible: true,
    visibleOnState: false,
    speed: 0.35,
    ease: 'expo.out',
    overwrite: true,
    skewing: 2,
    skewingText: 2,
    skewingIcon: 2,
    skewingMedia: 2,
    skewingDelta: 0.001,
    skewingDeltaMax: 0.15,
    stickDelta: 0,
    showTimeout: 0,
    hideOnLeave: true,
    hideTimeout: 0,
    hideMediaTimeout: 0
  }

  private packages: BehaviorSubject<SenderEntry<any, any>[]> = new BehaviorSubject<SenderEntry<any, any>[]>(new Array<SenderEntry<any, any>>())

  @ViewChild("cursor", {read: ElementRef})
  private cursorDivRef!: ElementRef;

  private readonly cursor: MouseFollower;
  private readonly sender: Sender;

  constructor(sender: Sender) {
    MouseFollower.registerGSAP(gsap)
    this.cursor = new MouseFollower(this.settings);
    this.sender = sender;
  }

  ngAfterViewInit() {
    this.retrievePackages(this.sender)
    let cursorDiv: HTMLElement = this.cursorDivRef.nativeElement;
    if (!cursorDiv) return;
    this.cursorInit(this.cursor, cursorDiv)
    this.mouseOverElements(this.packages, this.cursor, cursorDiv)
  }

  private retrievePackages(sender: Sender) {
    sender.retrieve(Cursor)
      .subscribe({
        next: (e) => {
          console.log(e)
          this.packages.next(e)
        }
      })
  }

  public cursorInit(mouse: MouseFollower, media: HTMLElement): MouseFollower {

    document.body.classList.add("cursor-none")

    this.mouseAppearance(mouse, media);
    this.mouseClick(media, ["-translate-1"]);

    mouse.setMedia(media)
    mouse.el.classList = "absolute z-999"
    mouse.container.firstChild?.before(this.cursor.el)

    return mouse;
  }

  private mouseAppearance(mouse: MouseFollower, media: HTMLElement) {
    document.body.onmouseenter = ()=> {
      mouse.show()
      mouse.setMedia(media)
    }
    document.body.onmouseleave = ()=> {
      mouse.hide()
      mouse.removeMedia()
    }
  }

  /*
  * Use tailwind for elements customization
  * */
  private mouseClick(media: HTMLElement, className: string[]): void {
    document.body.onmousedown = ()=> {
      media.style.scale = "0.8"
      className.forEach((cn) => {
        media.classList.add(cn)
      })
    }
    document.body.onmouseup = ()=> {
      media.style.scale = "1"
      className.forEach((cn) => {
        media.classList.remove(cn)
      })
    }
  }

  private mouseOverElements(elements: BehaviorSubject<SenderEntry<any, any>[]>, mouse: MouseFollower, media: HTMLElement) {
    elements.subscribe({
      next: (array) =>{
        array.forEach(se => {
          this.mouseOverElement((<ElementRef>se.parcel).nativeElement, mouse, media)
        })
      }
    })
  }

  private mouseOverElement(element: HTMLElement, mouse: MouseFollower, media: HTMLElement) {
    let originalWidth = media.clientWidth;
    let originalHeight = media.clientHeight;
    let originalBorderRadius = media.style.borderRadius;
    let originalBorderColor = media.style.borderColor;

    element.addEventListener("mouseenter", (me) => {
      media.style.width = `${element.offsetWidth}px`
      media.style.height = `${element.offsetHeight}px`
      media.style.borderRadius = `20px`
      media.style.borderColor = `var(--forth-color)`
      mouse.setSkewing(0)
      mouse.setStick(element)
    })
    element.addEventListener("mouseleave", (me) => {
      media.style.width = `${originalWidth}px`
      media.style.height = `${originalHeight}px`
      media.style.borderRadius = originalBorderRadius
      media.style.borderColor = originalBorderColor
      mouse.setSkewing(this.settings.skewing)
    })
  }
}

