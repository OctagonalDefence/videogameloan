import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

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
  registerForm: FormGroup;
  showRegisterForm = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    const user = new User();

    this.loginForm = this.formBuilder.group({
      username: [user.name, Validators.required],
      password: [user.password, Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      email: [user.email, [Validators.required, Validators.email]],
      name: [user.name, Validators.required],
      password: [user.password, Validators.required]
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

  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(() => {
      alert('Registration successful!');
      this.showRegisterForm = false;
      this.router.navigate(['/login']);
    }, (error) => {
      console.error('Registration failed', error);
      alert('Registration failed. Please try again.');
    });
  }
}