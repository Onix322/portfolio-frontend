import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Navigation} from '../navigation/navigation';
import {HeroDetails} from '../hero-details/hero-details';

@Component({
  selector: 'app-header',
  imports: [
    HeroDetails,
    Navigation
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements AfterViewInit {

  @ViewChild("headerContainer")
  private headerContainer: ElementRef<HTMLElement> | undefined;
  @ViewChild("mouseBlur")
  private mouseBlur: ElementRef<HTMLElement> | undefined;

  ngAfterViewInit(): void {
    this.hoverCardAnimation()
    this.hoverMouseBlurAnimation()
  }

  public hoverMouseBlurAnimation(){
    if (!this.mouseBlur) return;
    let mouse: HTMLElement = this.mouseBlur.nativeElement;

    window.addEventListener("mousemove", (e) => {
      mouse.style.top = (e.screenY - mouse.offsetHeight) * -1.2 + "px"
      mouse.style.right = (e.screenX - mouse.offsetWidth) * 1.2 + 300 + "px"
    })

  }

  public hoverCardAnimation(): void {
    if (!this.headerContainer) return;

    let container: HTMLElement = this.headerContainer.nativeElement;
    let cutBy = 900;

    container.addEventListener("mousemove", (e) => {
      let coordinates: any = this.getCardMousePositionIn(container, e.screenX, e.screenY)
      container.style.transform = "rotateX(" + coordinates.positionX / cutBy + "deg)"
        + "rotateY(" + coordinates.positionY / cutBy + "deg)";
    })
    this.headerContainer.nativeElement.addEventListener("mouseout", (e) => {
      container.style.transform = "rotateX(0deg) rotateY(0deg)";
      // mouse.style.marginTop = "0"
      // mouse.style.marginLeft = "0"
    })
  }

  //y - height
  //x - width
  public getCardMousePositionIn(container: HTMLElement, mx: number, my: number): Object {
    let containerWidth = container.offsetWidth.valueOf()
    let containerHeight = container.offsetHeight.valueOf()
    let middleH = containerHeight / 2
    let middleW = containerWidth / 2

    let y: number = my < middleH ? 0 - middleH : middleH;
    let x = mx < middleW ? middleW : 0 - middleW;
    return {
      positionX: x,
      positionY: y
    }
  }
}
