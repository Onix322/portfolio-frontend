import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {Sender} from '../../service/sender/sender';
import {Cursor} from '../cursor/cursor';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements AfterViewInit {

  @ViewChildren("send")
  private buttons!: QueryList<HTMLElement>;

  private readonly sender: Sender;

  constructor(sender: Sender) {
    this.sender = sender;
  }

  ngAfterViewInit() {
    this.sender.collect(Cursor, Header, this.buttons.toArray())
  }
}
