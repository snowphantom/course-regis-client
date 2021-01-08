import { Injectable, Testability } from '@angular/core';
import { Http } from '@angular/http';
import { User } from 'app/models/User';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { AlertService } from './common/alert.service';
import { catchError, map } from "rxjs/operators";

@Injectable()
export class AuthenticateService {

  private host: string = environment.hostname;
  private baseApi = `${this.host}/api/user`;


  public currentUser: Observable<User>;

  constructor(
    private http: Http
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
