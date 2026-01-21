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
  @Input({ required: true }) text!: string;
  @Input() color: ButtonColor = 'blue';
  @Output() clickMeParent = new EventEmitter();

  @HostBinding('class')
  get hostClasses() {
    return `btn btn-${this.color}`;
  }

  onClick() {
    this.clickMeParent.emit();
  }
}
