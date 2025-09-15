import {AfterViewInit, Component, ElementRef, Input, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Sender} from '../../service/sender/sender';
import {Cursor} from '../cursor/cursor';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation implements AfterViewInit {

  @Input()
  vertical: boolean = false;

  @ViewChildren("send")
  private buttons!: QueryList<HTMLElement>;

  @ViewChild("navContent")
  private navContent!: ElementRef;

  private readonly sender: Sender;

  constructor(sender: Sender) {
    this.sender = sender;
  }

  ngAfterViewInit() {
    if (this.vertical) {
      this.navContent.nativeElement.classList.add("flex-col")
    }
    this.buttons.forEach(b => {
      this.sender.collect(Cursor, Navigation, b)
    })
  }
}
