import { Component, OnInit } from '@angular/core';
import { AppareilService } from './service/appareil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth = false;

  // lastUpdate: Promise<Date> = new Promise((resolve, reject) => {
  //   const date: Date = new Date();
  //   setTimeout(
  //     () => {
  //       resolve(date);
  //     }, 2000);
  // });

  lastUpdate = new Date()


  appareils: any[] = []
  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit() {
    this.appareils = this.appareilService.appareils;
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    this.appareilService.switchOffAll();
  }
}
