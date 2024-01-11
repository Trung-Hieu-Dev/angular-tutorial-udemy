import { Component } from '@angular/core';

import { CounterService } from '../counter.service';
import { Store } from '@ngrx/store';
import { decrement, increment } from '../store/counter.actions';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
})
export class CounterControlsComponent {
  constructor(
    private counterService: CounterService,
    private store: Store,
  ) {}

  increment() {
    // this.counterService.increment();
    this.store.dispatch(increment({ value: 5 }));
  }

  decrement() {
    // this.counterService.decrement();
    this.store.dispatch(decrement({ value: 5 }));
  }
}
