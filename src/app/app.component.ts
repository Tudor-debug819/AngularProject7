import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  private destroyRef = inject(DestroyRef);
  clickCount$ = toObservable(this.clickCount);


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

    this.clickCount$.subscribe();

  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);

  }

}
