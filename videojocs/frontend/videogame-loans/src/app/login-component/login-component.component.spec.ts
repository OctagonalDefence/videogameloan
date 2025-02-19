import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponentComponent } from './login-component.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponentComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, LoginComponentComponent], 
      providers: [
        FormBuilder, 
        AuthService,
        { provide: Router, useValue: routerSpy }
      ], 
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginComponentComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the form builder injected', () => {
    expect(component.formBuilder).toBeTruthy();
  });

  it('should have the login method', () => {
    expect(component.login).toBeTruthy();
  });

  it('should have the formbuilder group set', () => {
    expect(component.loginForm).toBeTruthy();
  });

  it('should have the form validators set', () => {
    expect(component.loginForm.controls['username']).toBeTruthy();
    expect(component.loginForm.controls['password']).toBeTruthy();
  });

  it('should login the user using the server and API JWT token', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(of({ token: '123' }));
    component.loginForm.setValue({ username: 'test', password: 'test' });
    component.login();
    expect(authService.login).toHaveBeenCalled();
  });

  it('should store the user in the local storage', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(of({ token: '123' }));
    spyOn(localStorage, 'setItem');
    component.loginForm.setValue({ username: 'test', password: 'test' });
    component.login();
    expect(localStorage.setItem).toHaveBeenCalledWith('token', '123');
  });

  it('should ensure the user is redirected to the home page after login', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(of({ token: '123' }));
    component.loginForm.setValue({ username: 'test', password: 'test' });
    component.login();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
