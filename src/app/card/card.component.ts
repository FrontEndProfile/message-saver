import { Component, OnInit, inject } from '@angular/core';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { DocumentData, Firestore  , collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
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
  cards_list$: Observable<any[]>;

  cardsCollection: Observable<Card[]> | undefined;

  
  // constructor(private firestore: Firestore, ) { 

  // }


  constructor(private firestore: Firestore) {
    const aCollection = collection(this.firestore, 'positions');
    this.cards_list$ = collectionData(aCollection, { idField: 'id' }).pipe(
      map((data: any[]) => {
        // Add the id property to each item in the array
        return data.map(item => ({ id: item.id, ...item }));
      })
    );
  
    this.cards_list$.subscribe(data => {
      console.log('Data from Firestore:', data);
      // Update local storage and cardPositions array
    });

  }



  ngOnInit(): void {
    this.loadPositionsFromFirestore();

    console.log("NG pr data 01 :  ",this.cardPositions)



  }

  drop(event: CdkDragDrop<Card[]>): void {
    moveItemInArray(this.cardPositions, event.previousIndex, event.currentIndex);
    this.savePositions();
  }


  async savePositions(): Promise<void> {
    const formattedPositions = this.cardPositions.map(card => ({
      messageTitle: card.messageTitle,
      messageTemplate: card.messageTemplate
    }));
  
    try {
      const docRef = doc(this.firestore, 'positions', 'cardPositions');
      await setDoc(docRef, { positions: formattedPositions });
      console.log('Firestore document updated successfully.');
    } catch (error) {
      console.error('Error updating Firestore document:', error);
    }
  }
  


  loadPositionsFromFirestore(): void {
    const aCollection = collection(this.firestore, 'positions');
    this.cards_list$ = collectionData(aCollection, { idField: 'id' }).pipe(
      map((data: any[]) => {
        if (data.length > 0 && data[0].positions) {
          return data[0].positions; // Extract positions array
        } else {
          return [];
        }
      })
    );

    this.cards_list$.subscribe(data => {
      console.log('Data from Firestore:', data);
      this.cardPositions = data;
      this.updateLocalStorage(); // Update local storage when Firestore data changes
    });
  }

  updateLocalStorage(): void {
    localStorage.setItem('cardPositions', JSON.stringify(this.cardPositions));
  }
  



  
}
