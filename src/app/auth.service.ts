import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private readonly password: string = '1122'; // Replace with your actual password

  constructor() { }

  authenticate(password: string): boolean {
    // Verify the entered password
    this.isAuthenticated = (password === this.password);
    return this.isAuthenticated;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

}
