import { Component } from '@angular/core';
import {Navigation} from '../../components/navigation/navigation';

@Component({
  selector: 'app-work',
  imports: [
    Navigation
  ],
  templateUrl: './work.html',
  styleUrl: './work.css'
})
export class Work {
    protected num: number[] = [1, 2, 3, 4, 5];
}
