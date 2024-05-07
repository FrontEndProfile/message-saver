import { Component, OnInit } from '@angular/core';
import { collection, doc, setDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuillModule } from 'ngx-quill'


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
  ) { }

  ngOnInit() {
    this.editorForm = this.fb.group({
      messageTitle: [''],
      messageTemplate: ['']
    });
  }

  async onSubmit() {
    console.log(this.editorForm.value);
    const formValues = this.editorForm.value;

    // Create a new object based on formValues
    const newObj = {
      messageTitle: formValues.messageTitle,
      messageTemplate: formValues.messageTemplate
    };

    // Get existing data from localStorage
    const storedData = localStorage.getItem('cardPositions');
    let cardPositions: { messageTitle: string, messageTemplate: string }[] = [];

    if (storedData) {
      cardPositions = JSON.parse(storedData);
    }
    // Push the new object into the array
    cardPositions.push(newObj);
    // Save updated array back to localStorage
    localStorage.setItem('cardPositions', JSON.stringify(cardPositions));

    const aCollection = collection(this.firestore, 'templates');
    const customDocRef = doc(aCollection, );
    await setDoc(customDocRef, newObj);
  
  }
}
