import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval } from 'rxjs/internal/observable/interval';
import * as Rx from 'rxjs'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  secondes: number = 0

  constructor() { }

  ngOnInit(): void {
    const counter = interval(1000)
    counter.subscribe(
      (value: number) => {
        this.secondes = value
      },
      (error: any) => {
        console.log('Une erreur à été rencontrée !');
      },
      () => {
        console.log('Obervable complété');

      }
    )
  }
}
