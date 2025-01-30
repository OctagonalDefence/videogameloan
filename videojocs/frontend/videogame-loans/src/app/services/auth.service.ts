import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const dbUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${dbUrl}/getAllUsers`);
  }


}
