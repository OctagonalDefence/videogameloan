import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {

loginForm: any;
  authService!: AuthService;
  router!: Router





constructor(public formBuilder: FormBuilder) {

  this.loginForm = this.formBuilder.group({
  username: ['', Validators.required],
  password: ['', Validators.required]
  });
}


login() {
  const username = this.loginForm.controls.username.value;
  const password = this.loginForm.controls.password.value;
  this.authService.login(username, password).subscribe((response: any) => {
    if (response.success) {
      this.router.navigate(['/home']);
    } else {
      this.loginForm.controls.username.setErrors({ 'invalid': true });
      this.loginForm.controls.password.setErrors({ 'invalid': true });
    }
  });
}
}



