import { Component, OnInit } from '@angular/core';
import { NgZeeTimeTableData, NgZeeTimeTableOptions } from 'ng-zee-timetable';
import { ToastrService } from 'ngx-toastr';
import { registration2TimetableData } from 'src/app/helper/timetable-helper';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { DayOfWeek } from "../../common/bunchOfEnum";

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  data: NgZeeTimeTableData = {};

  constructor(
    private registrationService: RegistrationService,
    private authenticateService: AuthenticateService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    const user = this.authenticateService.currentUser;
    
    if (user) {
      this.registrationService.getEnroll(user && user.username)
      .subscribe(enrolled => {
        this.data = registration2TimetableData(enrolled);
      }, (err) => {
        let message = err.error ? err.error.message : err.message;
        this.toastrService.error(message);
      });
    }
  }

  options: NgZeeTimeTableOptions = {
    element: {
      background: '#3f51b5', titleColor: 'white', subTitleColor: 'white'
    },
    rowLabel: {
      background: '#3f51b5',
      labelColor: 'white'
    }
  };

  days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}
