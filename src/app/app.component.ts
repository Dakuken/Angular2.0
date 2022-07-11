import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval } from 'rxjs/internal/observable/interval';
import * as Rx from 'rxjs'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  secondes: number = 0
  counterSubscription!: Rx.Subscription;
  constructor() { }

  ngOnInit(): void {
    const counter = interval(1000)
    this.counterSubscription = counter.subscribe(
      (value: number) => {
        this.secondes = value
      }
    );
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe()
  }
}
