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
  @ViewChild("headerContainerShadow")
  private headerContainerShadow: ElementRef<HTMLElement> | undefined;

  ngAfterViewInit(): void {
    this.hoverCardAnimation()
  }

  public hoverCardAnimation(): void {
    if (!this.headerContainer || !this.headerContainerShadow){
      console.error("Element undefined")
      return;
    }

    let container: HTMLElement = this.headerContainer.nativeElement;
    let shadow: HTMLElement = this.headerContainerShadow.nativeElement;
    let cutBy = 900;

    container.addEventListener("mousemove", (e) => {
      let coordinates: any = this.getCardMousePositionIn(container, e.screenX, e.screenY)
      container.style.transform = "rotateX(" + coordinates.positionX / cutBy + "deg)"
        + "rotateY(" + coordinates.positionY / cutBy + "deg) translateX(-50%)";

      shadow.style.boxShadow = ((e.screenX / 2 - 500) + "px " +(e.screenY / 2 - 400) + "px 400px -200px #181613")
    })
    this.headerContainer.nativeElement.addEventListener("mouseout", (e) => {
      container.style.transition = "0.2s ease";
      container.style.transform = "";
      container.style.boxShadow = "0 0 70px 20px #181613"
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
