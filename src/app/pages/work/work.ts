import {AfterViewInit, Component, ElementRef, numberAttribute, ViewChild} from '@angular/core';
import {Navigation} from '../../components/navigation/navigation';
import Tween = gsap.core.Tween;

@Component({
  selector: 'app-work',
  imports: [
    Navigation
  ],
  templateUrl: './work.html',
  styleUrl: './work.css'
})
export class Work implements AfterViewInit {

  @ViewChild("projectsContainer")
  private projectsContainerRef!: ElementRef

  protected num: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  ngAfterViewInit(): void {
    let native = this.projectsContainerRef.nativeElement

    //make smooth scroll
  }
}
