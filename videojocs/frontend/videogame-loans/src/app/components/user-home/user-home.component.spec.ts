import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { UserHomeComponent } from './user-home.component';
import { AuthService } from '../../services/auth.service';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeComponent, HttpClientTestingModule],
      providers: [AuthService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserHomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize user and load games on init', fakeAsync(() => {
    spyOn(component, 'loadGames');
    localStorage.setItem('username', 'testuser');
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(component.user.username).toBe('testuser');
    expect(component.loadGames).toHaveBeenCalled();
  }));

  it('should call authService.logout on logout', fakeAsync(() => {
    spyOn(authService, 'logout').and.callThrough();
  
    fixture.detectChanges();
    component.logout();
    tick();
  
    expect(authService.logout).toHaveBeenCalled();
  }));
  

  
  

  it('should handle error on loadGames', fakeAsync(() => {
    spyOn(authService, 'getAllGames').and.returnValue(throwError(() => new Error('error')));
    spyOn(console, 'error');
    
    fixture.detectChanges();
    component.loadGames();
    tick();
  
    expect(authService.getAllGames).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(new Error('error'));
  }));
  

  
});