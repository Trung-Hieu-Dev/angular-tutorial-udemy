import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';

import { decrement, increment, init, set } from './counter.actions';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selector';

@Injectable()
export class CounterEffects {
  // load counter from local storage
  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedCounter = localStorage.getItem('count');
        if (storedCounter) {
          return of(set({ value: +storedCounter }));
        }
        return of(set({ value: 0 }));
      }),
    ),
  );

  // save counter to local storage
  saveCount = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)), // get the latest counter value
        tap(([action, counter]) => {
          console.log(action);
          localStorage.setItem('count', counter.toString());
        }),
      );
    },
    { dispatch: false }, // setting do not dispatch a new action when it's done
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>,
  ) {}
}
