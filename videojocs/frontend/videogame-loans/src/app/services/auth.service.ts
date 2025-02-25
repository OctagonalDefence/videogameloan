import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const dbUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${dbUrl}/users/getAllUsers`);
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${dbUrl}/users/login`, { username, password });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  getAllGames() {
    return this.http.get(`${dbUrl}/games/getAllGames`);
  }

  getAllLoans() {
    return this.http.get(`${dbUrl}/loans/getAllLoans`);
  }

  rentVideogame(id: number) {
    return this.http.post(`${dbUrl}/rentVideogame`, { id });
  }

  returnVideogame(id: number) {
    return this.http.post(`${dbUrl}/returnVideogame`, { id });
  }
}