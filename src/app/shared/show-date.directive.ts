import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { Task } from '../model/task';

@Directive({
  selector: '[appShowDate]'
})
export class ShowDateDirective {
  @Input()
  private date;
  @Input()
  private isDone: boolean;
  private p;
  private bgColor: string;

  constructor(private el: ElementRef, private render: Renderer2) {
    this.p = this.render.createElement('p');
  }

  @HostListener('mouseenter')
  mouseenter(event: Event) {
    this.p.innerHTML = this.date.toDate().toLocaleDateString();

    if (this.isDone) {
      this.render.appendChild(this.el.nativeElement, this.p);
      this.bgColor = this.el.nativeElement.style.backgroundColor;
      this.el.nativeElement.style.backgroundColor = 'lightgrey';
    } else {
      this.render.addClass(this.p, 'flex-date');
      this.render.appendChild(this.el.nativeElement.children[0], this.p);
    }
  }

  @HostListener('mouseleave')
  mouseleave(event: Event) {

    if (this.isDone) {
      this.render.removeChild(this.el.nativeElement, this.p);
      this.el.nativeElement.style.backgroundColor = this.bgColor;
    } else {
      this.render.removeChild(this.el.nativeElement.children[0], this.p);
    }
  }
}
