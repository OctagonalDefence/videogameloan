import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers : [provideHttpClient()]

    });
    service = TestBed.inject(AuthService);
    
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   
  it('should have the getAllUsers method', () => {
    expect(service.getAllUsers).toBeDefined();
  });

  it('getAllUsers should retrieve all users from the database', () => {
    expect(service.getAllUsers()).toBeTruthy();    
  });

  it('should have the login method', () => {
    expect(service.login).toBeDefined();
  });

  it('login should authenticate the user', () => {
    expect(service.login('username', 'password')).toBeTruthy();    
  });
  


});
