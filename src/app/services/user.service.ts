import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {
  currentUser;

  constructor(
    private http: Http
  ) { }

  login(username: string, password: string) {
    return this.http.get('https://google.com/');
  }
}
