import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { ButtonColor } from './button.types';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: ButtonColor = 'blue';
  @Output() btnClick = new EventEmitter();

  @HostBinding('class')
  get hostClasses() {
    return `btn btn-${this.color}`;
  }

  onClick() {
    this.btnClick.emit();
  }
}
