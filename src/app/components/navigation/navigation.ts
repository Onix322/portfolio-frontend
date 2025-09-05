import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HireMeButton} from '../button/hire-me-button/hire-me-button';

@Component({
  selector: 'app-navigation',
  imports: [
    FormsModule,
    HireMeButton
  ],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation {

}
