import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { CdkDrag, CdkDragPlaceholder, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { CardComponent } from './card/card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardCreateComponent } from './card-create/card-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { PasswordComponent } from './password/password.component';
import { UpdateComponent } from './update/update.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardCreateComponent,
    PasswordComponent,
    UpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    CdkDropList, 
    CdkDrag, 
    CdkDragPlaceholder, 
    NgbModule,
    QuillModule.forRoot(),
    provideFirebaseApp(() => initializeApp({"projectId":"message-saver-5fbc1","appId":"1:243320602473:web:5cddccd5d784187b4407f8","storageBucket":"message-saver-5fbc1.appspot.com","apiKey":"AIzaSyAuaIw33rqwz11PfD8sX3P_370TBYJb7AA","authDomain":"message-saver-5fbc1.firebaseapp.com","messagingSenderId":"243320602473"})),
    provideFirestore(() => getFirestore()),
    MatDialogModule, MatButtonModule , MatDividerModule , MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
