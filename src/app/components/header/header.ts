import { Component } from '@angular/core';
import {Navigation} from '../navigation/navigation';
import {HeroDetails} from '../hero-details/hero-details';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    HeroDetails,
    Navigation
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
