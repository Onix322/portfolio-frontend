import { Component } from '@angular/core';
import {Header} from '../../com/sections/header/header';
import {Navigation} from '../../com/util-com/navigation/navigation';
import {Work} from '../../com/sections/work/work';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Navigation,
    Work
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
