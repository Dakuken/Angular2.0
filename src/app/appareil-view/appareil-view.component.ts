import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../service/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  isAuth = false;

  lastUpdate: Promise<Date> = new Promise((resolve, reject) => {
    const date: Date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000);
  });

  // lastUpdate = new Date()


  appareils: any[] = []
  appareilSubscription!: Subscription;

  constructor(private appareilService: AppareilService,) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilSuject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils // on asssocie la copie à notre variable local
      }
    );
    this.appareilService.emitAppareilSubject()
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    this.appareilService.switchOffAll();
  }

  onSave() {
    this.appareilService.saveAppareilToServer()
  }

  onFetch() {
    this.appareilService.getAppareilFromServer()
  }
}
