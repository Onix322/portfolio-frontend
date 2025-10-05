import {AfterViewInit, Component, signal, ViewChild, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ScrollService} from './service/scroll/scroll-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Alexandru Dobos.');

}
