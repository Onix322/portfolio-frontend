import {AfterViewInit, Component, ElementRef, signal, ViewChild, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ScrollService} from './service/scroll/scroll-service';
import {Navigation} from './com/util-com/navigation/navigation';
import {Grabber} from './service/grabber/grabber';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit{
  protected readonly title = signal('Alexandru Dobos.');

  @ViewChild('pageWrapper', {read: ElementRef<HTMLElement>})
  private wrapper!: ElementRef<HTMLElement>;
  @ViewChild('pageContent', {read: ElementRef<HTMLElement>})
  private content!: ElementRef<HTMLElement>;

  private scroll: ScrollService;

  constructor(scroll: ScrollService, private grabber: Grabber) {
    this.scroll = scroll
  }
  ngAfterViewInit(): void {
    this.scroll.createSmoother({
      wrapper: this.wrapper.nativeElement,
      content: this.content.nativeElement
    })

    this.grabber.respond<ElementRef<HTMLElement>>('forNavigationContainer', this.wrapper)
  }
}
