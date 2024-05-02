import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuillModule } from 'ngx-quill'


@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrl: './card-create.component.scss'
})
export class CardCreateComponent implements OnInit {
  editorForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.editorForm = this.fb.group({
      messageTitle: [''],
      messageTemplate: ['']
    });
  }

  onSubmit() {
    console.log(this.editorForm.value);
  
      // Get form values
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

  
  }
}
