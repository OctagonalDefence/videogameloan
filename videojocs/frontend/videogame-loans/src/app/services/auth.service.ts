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
    return this.http.get(`${dbUrl}/getAllUsers`);
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${dbUrl}/login`, { username, password });
  }
}