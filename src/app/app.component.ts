import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  private destroyRef = inject(DestroyRef);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  customInterval$ = new Observable((subscriber) => {
    setInterval(() => {
      console.log('Emitting new value...');
      subscriber.next({ message: 'New value' });
    }, 2000);
  });


  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times`);
    // })
  }
  ngOnInit(): void {
    // const subscription = interval(1000).pipe(
    //   map((val) => val*2),


    // ).subscribe({
    //   next: (val) => console.log(val),
    // });

    // this.destroyRef.onDestroy(() =>{
    //   subscription.unsubscribe();

    // });
    this.customInterval$.subscribe({
      next: (val) => console.log(val),
    });

    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times`),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();

    });
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);

  }

}
