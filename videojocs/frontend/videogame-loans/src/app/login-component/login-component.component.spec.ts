import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponentComponent } from './login-component.component';
import e from 'express';

describe('LoginComponentComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponentComponent]
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
    expect(compiled.querySelector('h2').textContent).toContain('Login');
    expect(compiled.querySelector('label').textContent).toContain('Usuari');
    expect(compiled.querySelector('label').textContent).toContain('Contrassenya');
    expect(compiled.querySelector('button').textContent).toContain('Entrar');    
  });

});
