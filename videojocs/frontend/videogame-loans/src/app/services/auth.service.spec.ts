import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the getAllUsers method', () => {
    expect(service.getAllUsers).toBeDefined();
  });

  it('getAllUsers should retrieve all users from the database', () => {
    const mockUsers = [{ username: 'user1' }, { username: 'user2' }];
    service.getAllUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${service['dbUrl']}/users/getAllUsers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should have the login method', () => {
    expect(service.login).toBeDefined();
  });

  it('login should authenticate the user', () => {
    const mockResponse = { token: '12345' };
    service.login('username', 'password').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['dbUrl']}/users/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'username', password: 'password' });
    req.flush(mockResponse);
  });

  it('should have the logout method', () => {
    expect(service.logout).toBeDefined();
  });

  it('logout should remove token and username from localStorage', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('username');
  });

  it('should have the getAllGames method', () => {
    expect(service.getAllGames).toBeDefined();
  });

  it('getAllGames should retrieve all games from the database', () => {
    const mockGames = [{ title: 'Game 1' }, { title: 'Game 2' }];
    localStorage.setItem('token', '12345');
    service.getAllGames().subscribe(games => {
      expect(games).toEqual(mockGames);
    });

    const req = httpMock.expectOne(`${service['dbUrl']}/games/getAllGames`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer 12345');
    req.flush(mockGames);
  });

  it('should have the getAllLoans method', () => {
    expect(service.getAllLoans).toBeDefined();
  });

  it('getAllLoans should retrieve all loans from the database', () => {
    const mockLoans = [{ id: 1, game: 'Game 1' }, { id: 2, game: 'Game 2' }];
    localStorage.setItem('token', '12345');
    service.getAllLoans().subscribe(loans => {
      expect(loans).toEqual(mockLoans);
    });

    const req = httpMock.expectOne(`${service['dbUrl']}/loans/getAllLoans`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer 12345');
    req.flush(mockLoans);
  });

  it('should have the rentVideogame method', () => {
    expect(service.rentVideogame).toBeDefined();
  });

  it('rentVideogame should rent a videogame', () => {
    const mockResponse = { message: 'Videogame rented successfully' };
    localStorage.setItem('token', '12345');
    service.rentVideogame(1, 'user1', 7).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['dbUrl']}/games/rentVideoGame`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer 12345');
    expect(req.request.body).toEqual({ gameID: 1, userID: 'user1', days: 7 });
    req.flush(mockResponse);
  });

  it('should have the returnVideogame method', () => {
    expect(service.returnVideogame).toBeDefined();
  });

  it('returnVideogame should return a videogame', () => {
    const mockResponse = { message: 'Videogame returned successfully' };
    localStorage.setItem('token', '12345');
    service.returnVideogame(1, 'user1').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['dbUrl']}/games/returnVideoGame`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer 12345');
    expect(req.request.body).toEqual({ gameID: 1, userID: 'user1' });
    req.flush(mockResponse);
  });
});