import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CardCreateComponent } from './card-create/card-create.component';

const routes: Routes = [
  { path: '', component: CardComponent },
  { path: 'create', component: CardCreateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
