import {Component} from '@angular/core';
import {Window} from "../../util-com/window/window";

@Component({
  selector: 'app-contact',
  imports: [
    Window
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  windowSettings: gsap.TweenVars = {
    "--border-c": 'transparent',
  }
}
