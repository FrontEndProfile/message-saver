import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CardCreateComponent } from './card-create/card-create.component';
import { PasswordComponent } from './password/password.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: CardComponent , canActivate: [AuthGuard] },
  { path: 'create', component: CardCreateComponent , canActivate: [AuthGuard]},

  { path: 'password', component: PasswordComponent },

  { path: '**', redirectTo: '' } // Redirect to home if route not found


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
