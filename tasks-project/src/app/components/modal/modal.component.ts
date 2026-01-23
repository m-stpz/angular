import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  closeModal = new EventEmitter();

  onClick() {
    this.closeModal.emit();
  }
}
