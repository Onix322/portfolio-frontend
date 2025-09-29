import { Component } from '@angular/core';
import {Header} from '../../com/header/header';
import {Navigation} from '../../com/navigation/navigation';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Navigation
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
