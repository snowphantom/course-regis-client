import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  currentUser;

  constructor(
    private http: HttpClient
  ) { }
  
}
