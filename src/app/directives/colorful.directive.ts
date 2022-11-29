import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appColorful]',
})
export class ColorfulDirective {
  constructor(private element: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.colorful(`none`);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.colorful(`grayscale(1)`);
  }

  private colorful(value: string) {
    this.element.nativeElement.style.filter = value;
  }
}
