import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
  passwordForm: FormGroup;
  showSnackbar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitPassword(): void {
    if (this.passwordForm.valid) {
      const password = this.passwordForm.value.password;
      if (this.authService.authenticate(password)) {
        this.router.navigate(['/']);
        this.snackBar.open('Login successful!', 'Close', { duration: 2000, panelClass: ['success-snackbar'] });
      } else {
        this.showSnackbar = true;
        setTimeout(() => {
          this.showSnackbar = false;
        }, 4000); // Hide snackbar after 3 seconds
        this.passwordForm.reset();
      }
    } else {
      console.log('Please enter a password');
      this.snackBar.open('Please Fill PIN CODE Above 8 Numbers', 'Close', { duration: 2000, panelClass: ['success-snackbar'] });
    }
  }

}
