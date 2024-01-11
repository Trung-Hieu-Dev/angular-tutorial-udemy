import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  // using HostBinding to bind the Host Properties
  @HostBinding('style.backgroundColor') backgroundColor: string =
    this.defaultColor;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'blue',
    // );
    this.elRef.nativeElement.style.backgroundColor = this.defaultColor;
  }

  // using HostListener to listen to the Host Events
  @HostListener('mouseenter') onMouseEnter(eventData: Event) {
    // using @HostListener
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'blue',
    // );
    // using @HostBinding
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseLeave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'transparent',
    // );
    this.backgroundColor = this.defaultColor;
  }
}
