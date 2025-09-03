import {Component, Input, OnInit} from '@angular/core';
import {Line} from "../../line/line";
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [
    Line
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

  ngOnInit(): void {
    if(this.hasTestimonial && (this.testimonial == "" || this.testimonial == " ")){
      throw new Error("If hasTestimonial == true -> you must insert testimonial")
    }
  }

}
