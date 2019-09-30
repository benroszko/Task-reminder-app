import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appShowDate]'
})
export class ShowDateDirective {
  @Input()
  private date: Date;

  private p;

  constructor(private el: ElementRef, private render: Renderer2) {
    this.p = this.render.createElement('p');
  }

  @HostListener('mouseenter')
  mouseenter(event: Event) {
    this.p.innerHTML = this.date.toLocaleDateString();
    this.render.appendChild(this.el.nativeElement, this.p);
  }

  @HostListener('mouseleave')
  mouseleave(event: Event) {
    this.render.removeChild(this.el.nativeElement, this.p);
  }

}
