import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponentComponent } from './login-component.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponentComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponentComponent, ReactiveFormsModule], // ✅ Import instead of declaring
      providers: [FormBuilder], // ✅ Provide FormBuilder
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
});
