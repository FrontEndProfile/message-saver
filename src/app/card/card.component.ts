import { Component, OnInit, inject } from '@angular/core';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { DocumentData, Firestore ,collection , collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface Card {
  id: string;
  messageTitle: string;
  messageTemplate: string;
}


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  
  cardPositions: Card[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.loadPositions();

    console.log("NG pr data :  ",this.cardPositions)
  }

  drop(event: CdkDragDrop<Card[]>): void {
    moveItemInArray(this.cardPositions, event.previousIndex, event.currentIndex);
    this.savePositions();
  }

  savePositions(): void {
    localStorage.setItem('cardPositions', JSON.stringify(this.cardPositions));
  }

  loadPositions(): void {
    const storedPositions = localStorage.getItem('cardPositions');
    if (storedPositions) {
      try {
        this.cardPositions = JSON.parse(storedPositions);
      } catch (error) {
        console.error('Error parsing stored positions:', error);
      }
    }
  }
  
}
