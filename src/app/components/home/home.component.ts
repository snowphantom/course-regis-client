import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { registration2TimetableData } from 'src/app/helper/timetable-helper';
import { User } from 'src/app/models/User';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CourseService } from 'src/app/services/course.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserType } from "../../common/bunchOfEnum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  UserType = UserType;

  constructor(
    private authenticateService: AuthenticateService,
    private router: Router,
    private courseService: CourseService,
    private toastrService: ToastrService,
    private registrationService: RegistrationService
  ) { }

  ngOnInit() {
    this.authenticateService.currentUserSubject.subscribe(user => {
      this.currentUser = user;

      if (user) {
        this.courseService.init().subscribe(items => {
          console.log(items);
        }, err => {
          let message = err.error ? err.error.message : err.message;
          this.toastrService.error(message);
        });

        if (user.type === UserType.Student)
          this.registrationService.getEnroll(user && user.username)
            .subscribe(enrolled => {
              console.log("Enrolled data: ", enrolled);
            }, (err) => {
              let message = err.error ? err.error.message : err.message;
              this.toastrService.error(message);
            });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
