import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './components/header/header';
import {Content} from './components/content/content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Content],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio-frontend');
}
