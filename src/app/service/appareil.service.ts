import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AppareilService {

    appareilSuject = new Subject<any[]>();

    private appareils = <any[]>[];

    constructor(private httpClient: HttpClient) { }

    emitAppareilSubject() {
        this.appareilSuject.next(this.appareils.slice()) //slice pour la copie
    }

    getAppareilById(id: number) {
        const appareil = <{ id: number, name: string, status: string }>this.appareils.find(
            (appareilObject) => {
                return appareilObject.id === id;
            }
        );
        return appareil
    }

    switchOnAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'allumé';
        }
        this.emitAppareilSubject();
    }

    switchOffAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'éteint';
        }
        this.emitAppareilSubject();
    }

    switchOnOne(index: number) {
        this.appareils[index].status = 'allumé';
        this.emitAppareilSubject();
    }

    switchOffOne(index: number) {
        this.appareils[index].status = 'éteint';
        this.emitAppareilSubject();
    }

    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };
        appareilObject.name = name
        appareilObject.status = status
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1

        this.appareils.push(appareilObject)
        this.emitAppareilSubject()
    }

    saveAppareilToServer() {
        this.httpClient
            .put('https://angular20-32ea6-default-rtdb.firebaseio.com/appareils.json', this.appareils)
            .subscribe(
                () => {
                    console.log('Enregistrement terminé !');

                },
                (error: any) => {
                    console.log('erreur de sauvegarde !' + error);

                }
            )
    }

    getAppareilFromServer() {
        this.httpClient
            .get<any[]>('https://angular20-32ea6-default-rtdb.firebaseio.com/appareils.json')
            .subscribe(
                (response) => {
                    this.appareils = response
                    this.emitAppareilSubject()
                },
                (error: any) => {
                    console.log('erreur de chargement' + error);
                }
            )
    }
}