import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-line',
  imports: [],
  templateUrl: './line.html',
  styleUrl: './line.css'
})
export class Line {
  @Input() size: number = 10;
  @Input() absolute: boolean = false;
}
