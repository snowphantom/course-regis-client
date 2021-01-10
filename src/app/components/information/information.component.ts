import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { getDayOfWeekVN } from 'src/app/helper/date-helper';
import { Course } from 'src/app/models/Course';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { DayOfWeek } from "../../common/bunchOfEnum";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'venue', 'day', 'start_time', 'end_time', 'regis'];
  dataSource: MatTableDataSource<Course>;

  enrolledCourses: Course[];

  constructor(
    private registrationService: RegistrationService,
    private authenticateService: AuthenticateService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    const user = this.authenticateService.currentUser;

    this.dataSource = new MatTableDataSource<Course>(this.registrationService.registration.enrolledCourse);
    
    this.registrationService.registrationSubject.subscribe(regis => {
      this.dataSource = new MatTableDataSource<Course>(regis.enrolledCourse);
    });
  }

  getDayOfWeek(day: number) { 
    return getDayOfWeekVN(day);
  }

  rolloff(course: Course) {
    const user = this.authenticateService.currentUser;

    this.registrationService.rolloff({username: user.username, code: course.code})
      .subscribe(data => {
        this.toastrService.success("Hủy đăng ký thành công.");
      }, err => {
        const message = err.error && err.error.message || err.message;
        this.toastrService.error(message)
      });
  }
}
