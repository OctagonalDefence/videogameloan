import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {

loginForm: any;





constructor(public formBuilder: FormBuilder) {

  this.loginForm = this.formBuilder.group({
  username: ['', Validators.required],
  password: ['', Validators.required]
  });
}


login() {
  

} 

}
