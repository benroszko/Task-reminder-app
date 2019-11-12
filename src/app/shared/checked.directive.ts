import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appChecked]'
})
export class CheckedDirective implements OnInit {

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {
    const li = this.el.nativeElement;
    this.render.setStyle(li, 'background', 'white');
    this.render.setStyle(li, 'padding', '2px');
    this.render.setStyle(li, 'border', '2px solid purple');
    this.render.setStyle(li, 'border-radius', '10px');
  }
}
