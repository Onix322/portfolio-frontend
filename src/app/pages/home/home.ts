import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Header} from '../../com/sections/header/header';
import {Navigation} from '../../com/util-com/navigation/navigation';
import {Work} from '../../com/sections/work/work';
import {ScrollService} from '../../service/scroll/scroll-service';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Navigation,
    Work
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit{

  private scroll: ScrollService;

  constructor(scroll: ScrollService) {
    this.scroll = scroll
  }

  ngAfterViewInit() {
    this.scroll.scroll(window)
  }
}
