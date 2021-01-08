import { Injectable, Testability } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { catchError, map, switchMap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/User';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthenticateService {

  private host: string = environment.hostname;
  private baseApi = `${this.host}/api/user`;

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  login(username: string, password: string) : Observable<any> {
    return this.http.post(`${this.baseApi}/authenticate`, {username, password})
      .pipe(
        map((res: any) => {
          if (res && res.data) {
            this.currentUser = res.data;
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            this.currentUserSubject.next(res.data)
          }
          return res;
        })
      )
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(undefined);
  }
}
