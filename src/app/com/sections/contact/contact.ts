import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {Window} from "../../util-com/window/window";
import {gsap} from 'gsap';
import {Chip} from '../../util-com/chip/chip';

@Component({
  selector: 'app-contact',
  imports: [
    Window,
    Chip
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements AfterViewInit{

  @ViewChild("contactSection", {read: ElementRef<HTMLElement>})
  private contactSection!: ElementRef<HTMLElement>
  @ViewChild("contactDetails", {read: ElementRef<HTMLElement>})
  private contactDetails!: ElementRef<HTMLElement>
  @ViewChild("contactFrom", {read: ElementRef<HTMLElement>})
  private contactFrom!: ElementRef<HTMLElement>


  windowSettings: gsap.TweenVars = {
    "--border-c": 'transparent',
  }
  constructor(private cd: ChangeDetectorRef) {

  }
  ngAfterViewInit() {

    const section = this.contactSection.nativeElement
    const details = this.contactDetails.nativeElement
    const form = this.contactFrom.nativeElement

    const sectionRect = section.getBoundingClientRect()

    console.log(sectionRect)

    this.cd.detectChanges()
  }
}
