import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Course } from '../models/Course';
import { Registration } from '../models/Registration';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseApi = `${environment.hostname}/api/registration/get-enroll`;
  courses: Course[];

  constructor(
    private http: HttpClient,
    private courseService: CourseService
  ) {
    this.courseService.coursesSubject.subscribe(x => {
      this.courses = x;
    });
   }

  rollup(data) {

  }

  getEnroll(username) : Observable<Registration> {
    return this.http.get(this.baseApi, {
      params: {
        username
      }
    }).pipe(
      map((res: any) => {
        return this.mappingEnrolled(res.data);
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
