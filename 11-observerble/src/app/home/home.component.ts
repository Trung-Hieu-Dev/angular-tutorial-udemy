import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    // create observable by built-in method of angular
    // interval belong to Observable so can use subscribe method to omit value
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    // create custom observable
    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete(); // stop and out
        }
        if (count > 3) {
          observer.error(new Error('Count is bigger than 3')); // fake error to handle it with observable
        }
        count++;
      }, 1000);
    });

    //  handle observable and transform data with operator pipe()
    this.firstObsSubscription = customIntervalObservable
      // transforms data
      .pipe(
        map((data: number) => {
          return 'Round ' + (data + 1);
        }),
      )
      // handle data
      .subscribe(
        // handle data
        (data) => {
          console.log(data);
        },
        (error) => {
          // handle error
          console.log(error);
          alert(error.message);
        },
        () => {
          // handle complete
          console.log('Completed!');
        },
      );
  }

  ngOnDestroy() {
    // destroy observable if not will cause leakage memory
    this.firstObsSubscription.unsubscribe();
  }
}
