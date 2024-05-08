import { Component, OnInit } from '@angular/core';
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuillModule } from 'ngx-quill'

import { Router } from '@angular/router'; // Import Router



@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrl: './card-create.component.scss'
})
export class CardCreateComponent implements OnInit {
  editorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore, 
    private router: Router
  ) { }

  ngOnInit() {
    this.editorForm = this.fb.group({
      messageTitle: [''],
      messageTemplate: ['']
    });
  }

  async onSubmit() {
    const formValues = this.editorForm.value;

    // Create a new object based on formValues
    const newCard = {
      messageTitle: formValues.messageTitle,
      messageTemplate: formValues.messageTemplate
    };

    try {
      // Get the existing document from Firestore
      const docRef = doc(this.firestore, 'positions', 'cardPositions');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // If the document exists, update its array of cards
        await updateDoc(docRef, {
          positions: arrayUnion(newCard)
        });
        console.log('New card added to Firestore.');
        // Reset the form
      this.editorForm.reset();
      this.router.navigate(['/']);


      } else {
        console.error('Document does not exist.');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

  
}
