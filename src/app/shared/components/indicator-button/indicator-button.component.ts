import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-indicator-button',
  templateUrl: './indicator-button.component.html',
  styleUrls: ['./indicator-button.component.scss']
})
export class IndicatorButtonComponent implements OnInit {
  @Input() btnClass: string;
  @Input() btnType: 'submit' | 'button' = 'button';
  @Input() indicate = false;
  @Input() disabled = false;
  @Output() btnClick: EventEmitter<MouseEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }
    event.stopPropagation();
    this.btnClick.emit(event);
  }

}
