import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/Course';
import { User } from 'src/app/models/User';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CourseService } from 'src/app/services/course.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { DayOfWeek, UserType } from "../../common/bunchOfEnum";
import { NewcourseFormComponent } from '../newcourse-form/newcourse-form.component';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'venue', 'day', 'start_time', 'end_time', 'regis'];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator,  {static: false}) paginator: MatPaginator;

  currentUser: User;
  UserType = UserType;

  constructor(
    private courseService: CourseService,
    private registrationService: RegistrationService,
    private authenticateService: AuthenticateService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.courseService.coursesSubject.subscribe(courses => {
      this.dataSource = new MatTableDataSource<Course>(courses);
    });

    this.authenticateService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  } 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDayOfWeek(day: number) { 
    return DayOfWeek[day];
  }

  regisCourse(course: Course) {
    this.registrationService.rollup({
      username: this.currentUser && this.currentUser.username || undefined,
      code: course.code
    }).subscribe(data => {
      this.toastrService.success('Đăng ký thành công');
    }, err => {
      const message = err.error && err.error.message || err.message;
      this.toastrService.error(message);
    });
  }

  newCourse() {
    const dialogRef = this.dialog.open(NewcourseFormComponent, {
      width: '500px',
      data: {name: 'test', age: 18}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Diaglog close');
    });
  }
}