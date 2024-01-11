import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighLight]',
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click') onClick() {
    this.higLight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.higLight('transparent');
  }

  ngOnInit(): void {}

  private higLight(color: string) {
    this.elementRef.nativeElement.style.backgroundColor = color;
  }
}
