import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponentComponent } from './login-component.component';
import e from 'express';

import { FormBuilder } from '@angular/forms';

describe('LoginComponentComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponentComponent, FormBuilder],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it('should create the interface', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container')).toBeTruthy();
    expect(compiled.querySelector('.row')).toBeTruthy();
    expect(compiled.querySelector('.col-md-6')).toBeTruthy();
    expect(compiled.querySelector('.col-md-offset-3')).toBeTruthy();
    expect(compiled.querySelector('h2')).toBeTruthy();
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('.form-group')).toBeTruthy();
    expect(compiled.querySelector('label[for="username"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="text"]')).toBeTruthy();
    expect(compiled.querySelector('label[for="password"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
               
  });

  

});
