import {AfterViewInit, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from './components/header/header';
import {Cursor} from './components/cursor/cursor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Cursor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  protected readonly title = signal('Alexandru Dobos.');
}
