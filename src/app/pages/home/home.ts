import {Component} from '@angular/core';
import {Header} from '../../com/sections/header/header';
import {Work} from '../../com/sections/work/work';
import {Contact} from '../../com/sections/contact/contact';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Work,
    Contact
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {


}
