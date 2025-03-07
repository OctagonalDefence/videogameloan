import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { LoanRegistryComponent } from './loan-registry.component';
import { AuthService } from '../../services/auth.service';

describe('LoanRegistryComponent', () => {
  let component: LoanRegistryComponent;
  let fixture: ComponentFixture<LoanRegistryComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanRegistryComponent, HttpClientTestingModule],
      providers: [AuthService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanRegistryComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load loans on init', () => {
    spyOn(component, 'loadLoans');
    component.ngOnInit();
    expect(component.loadLoans).toHaveBeenCalled();
  });

  it('should load loans and set loans on loadLoans', () => {
    const mockLoans = [{ id: 1, videogame: { id: 1 }, user: { id: 1 } }];
    spyOn(authService, 'getAllLoans').and.returnValue(of(mockLoans));
    component.loadLoans();
    expect(authService.getAllLoans).toHaveBeenCalled();
    expect(component.loans).toEqual(mockLoans);
  });

  it('should handle error on loadLoans', () => {
    spyOn(authService, 'getAllLoans').and.returnValue(throwError('error'));
    spyOn(console, 'error');
    component.loadLoans();
    expect(authService.getAllLoans).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('error');
  });

  it('should return videogame and reload loans on returnVideogame', () => {
    const mockLoans = [{ id: 1, videogame: { id: 1 }, user: { id: 1 } }];
    component.loans = mockLoans;
    spyOn(authService, 'returnVideogame').and.returnValue(of({}));
    spyOn(component, 'loadLoans');
    component.returnVideogame(1);
    expect(authService.returnVideogame).toHaveBeenCalledWith(1, '1');
    expect(component.loadLoans).toHaveBeenCalled();
  });

  it('should handle error on returnVideogame', () => {
    const mockLoans = [{ id: 1, videogame: { id: 1 }, user: { id: 1 } }];
    component.loans = mockLoans;
    spyOn(authService, 'returnVideogame').and.returnValue(throwError('error'));
    spyOn(console, 'error');
    component.returnVideogame(1);
    expect(authService.returnVideogame).toHaveBeenCalledWith(1, '1');
    expect(console.error).toHaveBeenCalledWith('error');
  });

  it('should log error if loan not found on returnVideogame', () => {
    spyOn(console, 'error');
    component.returnVideogame(999);
    expect(console.error).toHaveBeenCalledWith('Loan not found');
  });
});