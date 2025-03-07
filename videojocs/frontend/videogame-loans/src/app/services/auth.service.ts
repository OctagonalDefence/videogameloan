import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const dbUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  dbUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${dbUrl}/users/getAllUsers`);
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${dbUrl}/users/login`, { username, password });
  }

  register(user: { email: string, name: string, password: string }): Observable<any> {
    return this.http.post(`${dbUrl}/users/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  getAllGames(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${dbUrl}/games/getAllGames`, { headers });
  }

  getAllLoans() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${dbUrl}/loans/getAllLoans`, { headers });
  }

  rentVideogame(gameID: number, userID: string, days: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${dbUrl}/games/rentVideoGame`, { gameID, userID, days }, { headers });
  }

  returnVideogame(gameID: number, userID: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${dbUrl}/games/returnVideoGame`, { gameID, userID }, { headers });
  }
}