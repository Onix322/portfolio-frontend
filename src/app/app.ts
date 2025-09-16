import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Cursor} from './components/cursor/cursor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cursor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  protected readonly title = signal('Alexandru Dobos.');
}
