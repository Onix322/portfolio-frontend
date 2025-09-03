import { Component } from '@angular/core';
import {Line} from '../line/line';
import {Card} from './card/card';

@Component({
  selector: 'app-content',
  imports: [
    Line,
    Card
  ],
  templateUrl: './content.html',
  styleUrl: './content.css'
})
export class Content {

}
