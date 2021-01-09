import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Course } from '../models/Course';
import { Registration } from '../models/Registration';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseApi = `${environment.hostname}/api/registration`;
  courses: Course[];

  registration: Registration;
  registrationSubject = new Subject<Registration>();

  constructor(
    private http: HttpClient,
    private courseService: CourseService
  ) {
    this.courseService.coursesSubject.subscribe(x => {
      this.courses = x;
    });
    this.registrationSubject.subscribe(regis => {
      this.registration = regis;
    });
   }

  rollup(data) : Observable<Registration> {
    const {username, code} = data;
    if (!username || !code)
      throw new Error('Vui lòng kiểm tra lại thông tin');

    return this.http.post(`${this.baseApi}/rollup`, {username, code})
      .pipe(
        map((res: any) => {
          if (res.success)
          {
            this.registrationSubject.next(this.mappingEnrolled(res.data));
            return this.registration;
          }
          else
            throw new Error(res.message);
        })
      )
  }

  rolloff(data) {
    const {username, code} = data;
    if (!username || !code)
      throw new Error('Vui lòng kiểm tra lại thông tin');

    return this.http.post(`${this.baseApi}/rolloff`, {username, code})
      .pipe(
        map((res: any) => {
          if (res.success)
          {
            this.registrationSubject.next(this.mappingEnrolled(res.data));
            return this.registration;
          }
          else
            throw new Error(res.message);
        })
      );
  }

  getEnroll(username) : Observable<Registration> {
    return this.http.get(`${this.baseApi}/get-enroll`, {
      params: {
        username
      }
    }).pipe(
      map((res: any) => {
        this.registrationSubject.next(this.mappingEnrolled(res.data));
        return this.registration;
      })
    )
  }

  mappingEnrolled(regis: Registration) : Registration {
    if (regis && regis.enrolled) {
      regis.enrolledCourse = [];
      regis.enrolled.forEach(code => {
        this.courses && this.courses.forEach(course => {
          if (`${course.code}` === code)
            regis.enrolledCourse.push(course);
        }); 
      });
    }

    return regis;
  }
}
