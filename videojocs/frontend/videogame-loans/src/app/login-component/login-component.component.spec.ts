import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponentComponent } from './login-component.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponentComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponentComponent, ReactiveFormsModule], 
      providers: [FormBuilder], 
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginComponentComponent);
    component = fixture.componentInstance;
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
    expect(component.loginForm.controls.username).toBeTruthy();
    expect(component.loginForm.controls.password).toBeTruthy();
  });

  it('should login the user', () => {
    component.loginForm.controls.username.setValue('admin');
    component.loginForm.controls.password.setValue('admin');
    component.login();
    expect(component.loginForm.valid).toBeTruthy();
  });
});
