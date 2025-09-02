import { Component } from '@angular/core';
import {Line} from '../line/line';
import {FormsModule} from '@angular/forms';
import {HireMeButton} from '../hire-me-button/hire-me-button';

@Component({
  selector: 'app-navigation',
  imports: [
    Line,
    FormsModule,
    HireMeButton
  ],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation {

}
