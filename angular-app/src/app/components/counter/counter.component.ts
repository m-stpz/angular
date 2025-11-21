import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  counterValue = signal(0);

  decrement() {
    // this.counterValue.set(this.counterValue() - 1);
    if (this.counterValue() === 0) {
      return;
    }

    // .update((getTheLatestValue) => do something with it)
    this.counterValue.update((val) => val - 1);
  }

  increment() {
    // this.counterValue.set(this.counterValue() + 1);
    this.counterValue.update((val) => val + 1);
  }

  reset() {
    this.counterValue.set(0);
  }
}
