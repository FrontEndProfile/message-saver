import { Component, inject } from '@angular/core';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { DocumentData, Firestore ,collection , collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface Card {
  id: string;
  messageTitle:string;
  messageTemplate:string;

  // Define other properties of your card here
}


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  firestore : Firestore = inject(Firestore);
  view$: Observable<any[]>

  cardPositions: string[] = [
    // '001',
    // '002',
    // '003',
  ];

  // see all cards for admin 
  constructor() {
    const aCollection = collection(this.firestore, 'templates')
    this.view$ = collectionData(aCollection)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cardPositions, event.previousIndex, event.currentIndex);
    this.savePositions();
  }

  savePositions() {
    localStorage.setItem('cardPositions', JSON.stringify(this.cardPositions));
  }
  // savePositions() {
  //   this.view$.subscribe((cards) => {
  //     cards.forEach((card, index) => {
  //       this.firestore.collection('templates').doc(card.id).update({ position: index });
  //     });
  //   });
  // }

  loadPositions() {
    const storedPositions = localStorage.getItem('cardPositions');
    if (storedPositions) {
      this.cardPositions = JSON.parse(storedPositions);
    }
  }

  ngOnInit() {
    this.loadPositions();
  }
}
