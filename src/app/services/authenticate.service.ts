import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from 'app/models/User';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AlertService } from './common/alert.service';

@Injectable()
export class AuthenticateService {

  private host: string = environment.hostname;
  private baseApi = `${this.host}/api/user`;


  public currentUser: Observable<User>;

  constructor(
    private http: Http
  ) { }

  login(username: string, password: string) {
    return this.http.post(`${this.baseApi}/authenticate`, {username, password})
      .pipe(map(res => {
        

      }));
  }
}
