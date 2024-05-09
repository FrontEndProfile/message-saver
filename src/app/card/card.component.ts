import { Component, OnInit, inject } from '@angular/core';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { DocumentData, Firestore  , collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';


// Interface for the card structure
interface Card {
  messageTitle: string;
  messageTemplate: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  // Array to store card positions
  cardPositions: Card[] = [];

  // Observable to hold the data retrieved from Firestore
  cards_list$: Observable<Card[]> | undefined;

  constructor(private firestore: Firestore,private clipboard: Clipboard, private snackBar: MatSnackBar ) {
    const aCollection = collection(this.firestore, 'positions');
    this.cards_list$ = collectionData(aCollection, { idField: 'id' }).pipe(
      map((data: any[]) => {
        // Add the id property to each item in the array
        return data.map(item => ({ id: item.id, ...item }));
      })
    );
  
    this.cards_list$.subscribe(data => {
      console.log('Data from Firestore:', data);
      // Update local storage and cardPositions array if localStorage is available
      if (typeof localStorage !== 'undefined') {
        this.savePositionsToLocalStorage(data);
      }
    });
  }

  // Method to save positions to local storage
savePositionsToLocalStorage(data: any[]): void {
  const positions = data.find(item => item.id === 'cardPositions');
  if (positions) {
    this.cardPositions = positions.positions;
    localStorage.setItem('cardPositions', JSON.stringify(this.cardPositions));
  }
}


  ngOnInit(): void {
    // Load positions from Firestore on component initialization
    this.loadPositionsFromLocalStorage();
    
  }

  // Method to handle dropping cards
  drop(event: CdkDragDrop<Card[]>): void {
    moveItemInArray(this.cardPositions, event.previousIndex, event.currentIndex);
    // Save the updated positions after dropping
    this.savePositions();
  }

  // Method to save positions to Firestore
  async savePositions(): Promise<void> {
    try {
      // Reference to the Firestore document
      const docRef = doc(this.firestore, 'positions', 'cardPositions');
      // Set the document data with updated positions
      await setDoc(docRef, { positions: this.cardPositions });
      console.log('Firestore document updated successfully.');
      console.log('savePositions ki XHR');
      
    } catch (error) {
      console.error('Error updating Firestore document:', error);
    }
  }

  // Method to load positions from Firestore
// Method to load positions from local storage
loadPositionsFromLocalStorage(): void {
  const storedPositions = localStorage.getItem('cardPositions');
  if (storedPositions) {
    try {
      this.cardPositions = JSON.parse(storedPositions);
    } catch (error) {
      console.error('Error parsing stored positions:', error);
    }
  }
}


// Method to delete a card based on its index
async deleteCard(index: number): Promise<void> {
  try {
    // Ask for confirmation before deleting
    const confirmDelete = confirm("Are you sure you want to delete this card?");
    if (!confirmDelete) {
      return; // Exit the function if user cancels
    }

    // Remove the card from the array
    this.cardPositions.splice(index, 1);

    // Update Firestore to reflect the changes
    const docRef = doc(this.firestore, 'positions', 'cardPositions');
    await updateDoc(docRef, {
      positions: this.cardPositions
    });

    console.log('Card deleted successfully.');
  } catch (error) {
    console.error('Error deleting card:', error);
  }
}

  // Method to copy card content to clipboard
  copyToClipboard(content: string): void {
    // Copy content to clipboard
    this.clipboard.copy(content);

    // Extract text from HTML content
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;
    const textContent = tempElement.textContent || tempElement.innerText || '';

    // Copy extracted text to clipboard
    this.clipboard.copy(textContent.trim());
    this.snackBar.open('Message copied to clipboard', 'Close', { duration: 2000 });

  }


}
