import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { UserHomeComponent } from './user-home.component';
import { AuthService } from '../services/auth.service';

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
  

  it('should load games and set videogames on loadGames', fakeAsync(() => {
    const mockGames = [{ id: 1, title: 'Game 1' }, { id: 2, title: 'Game 2' }];
    spyOn(authService, 'getAllGames').and.returnValue(of(mockGames));
    
    fixture.detectChanges();
    component.loadGames();
    tick();
  
    expect(authService.getAllGames).toHaveBeenCalled();
    expect(component.videogames).toEqual(mockGames);
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
  

  it('should call authService.rentVideogame on rentVideogame', fakeAsync(() => {
    spyOn(authService, 'rentVideogame').and.returnValue(of('Success'));
    spyOn(console, 'log');
    
    fixture.detectChanges();
    component.rentVideogame(1, 7);
    tick();
  
    expect(authService.rentVideogame).toHaveBeenCalledWith(1, 'testuser', 7);
    expect(console.log).toHaveBeenCalledWith('Videogame rented successfully');
  }));
  

  it('should handle error on rentVideogame', fakeAsync(() => {
    spyOn(authService, 'rentVideogame').and.returnValue(throwError('error'));
    spyOn(console, 'error');
    localStorage.setItem('username', 'testuser');
    fixture.detectChanges();
    component.rentVideogame(1, 7);
    tick();
    expect(authService.rentVideogame).toHaveBeenCalledWith(1, 'testuser', 7);
    expect(console.error).toHaveBeenCalledWith('error');
  }));
});