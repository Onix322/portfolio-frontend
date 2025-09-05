import {Component, Input, OnInit} from '@angular/core';
import {Line} from "../../line/line";
import {NgIf} from '@angular/common';
import {Button} from '../../button/button';

@Component({
  selector: 'app-card',
  imports: [
    Line,
    Button
  ],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card implements OnInit{

  @Input() name:string =""
  @Input() description:string =""
  @Input() stack: string[] =[]
  @Input() hasTestimonial:boolean =false
  @Input() testimonialName:string =""
  @Input() testimonial:string =""
  @Input() link:string =""

  ngOnInit(): void {
    if(this.hasTestimonial && (this.testimonial == "" || this.testimonial == " ")){
      throw new Error("If hasTestimonial == true -> you must insert testimonial")
    }
  }

}
