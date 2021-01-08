import { Injectable, Testability } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './common/alert.service';
import { catchError, map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class AuthenticateService {

  private host: string = environment.hostname;
  private baseApi = `${this.host}/api/user`;


  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string) : Observable<any> {
    return this.http.post(`${this.baseApi}/authenticate`, {username, password})
      .pipe(
        map((res: any) => {
          if (res && res.data) {
            this.currentUser = res.data;
          }
          return res;
        }),
        catchError(err => {
          return err._body.json();
        })
      )
  }
}
