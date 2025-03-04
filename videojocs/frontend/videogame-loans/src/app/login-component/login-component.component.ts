import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((data) => {
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', this.loginForm.value.username);
        this.router.navigate(['/user-home']);
      }
    }, (error) => {
      console.error('Login failed', error);
      alert('Login failed. Please check your username and password.');
    });
  }
}