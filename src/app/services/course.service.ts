import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  hostname = environment.hostname;
  baseApi = `${this.hostname}/api/course`

  public coursesSubject: BehaviorSubject<Course[]>;
  public courses: Course[];

  constructor(
    private http: HttpClient
  ) {
    this.coursesSubject = new BehaviorSubject<Course[]>(JSON.parse(localStorage.getItem('courses')));
    this.coursesSubject.subscribe(courses => {
      this.courses = courses;
    })

    //this.init();
   }

  init() : Observable<Course[]> {
    return this.http.get(`${this.baseApi}/list`)
      .pipe(
        map((res: any) => {
          if (res && res.success && res.data) {
            this.courses = res.data;
            localStorage.setItem('courses', JSON.stringify(res.data));
            this.coursesSubject.next(res.data);
          }

          return res.data;
        })
      )
  }

  create(course) : Observable<Course> {
    return this.http.post(`${this.baseApi}/create`, course)
      .pipe(
        map((res: any) => {
          if (res && res.success && res.data) {
            this.courses.push(res.data);
            localStorage.setItem('courses', JSON.stringify(this.courses));
            this.coursesSubject.next(this.courses);
          } else {
            throw new Error('Có lỗi xảy ra');
          }

          return res.data;
        })
      )
  }

  getAll() {
    return this.courses;
  }

  getInfo(codes: string[]) {
    this.http.get(`${this.baseApi}/info`, {
      params: {
        code: codes
      }
    })
      .pipe(
        map((res: any) => {
          return res;
        })
      )
  }
}
