import {Component} from '@angular/core';
import {Header} from '../../com/sections/header/header';
import {Work} from '../../com/sections/work/work';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Work
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {


}
