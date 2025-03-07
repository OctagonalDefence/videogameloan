import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponentComponent } from './login-component.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponentComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, LoginComponentComponent], 
      providers: [
        FormBuilder, 
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ], 
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginComponentComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
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

  it('should call authService.login on login', () => {
    authService.login.and.returnValue(of({ token: '12345' }));
    component.loginForm.setValue({ username: 'testuser', password: 'password' });
    component.login();
    expect(authService.login).toHaveBeenCalledWith('testuser', 'password');
  });

  it('should navigate to /user-home on successful login', () => {
    authService.login.and.returnValue(of({ token: '12345' }));
    component.loginForm.setValue({ username: 'testuser', password: 'password' });
    component.login();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/user-home');
  });

  it('should store token and username in localStorage on successful login', () => {
    spyOn(localStorage, 'setItem');
    authService.login.and.returnValue(of({ token: '12345' }));
    component.loginForm.setValue({ username: 'testuser', password: 'password' });
    component.login();
    expect(localStorage.setItem).toHaveBeenCalledWith('token', '12345');
    expect(localStorage.setItem).toHaveBeenCalledWith('username', 'testuser');
  });

  it('should show alert on login failure', () => {
    spyOn(window, 'alert');
    authService.login.and.returnValue(throwError('Login failed'));
    component.loginForm.setValue({ username: 'testuser', password: 'password' });
    component.login();
    expect(window.alert).toHaveBeenCalledWith('Login failed. Please check your username and password.');
  });
});