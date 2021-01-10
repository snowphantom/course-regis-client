import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-newcourse-form',
  templateUrl: './newcourse-form.component.html',
  styleUrls: ['./newcourse-form.component.css']
})
export class NewcourseFormComponent implements OnInit {
  newCourse = new Course();
  code = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  venue = new FormControl('', [Validators.required]);
  day = new FormControl('', [Validators.required]);
  start_time = new FormControl('', [Validators.required, Validators.pattern(/\d+:\d+/)]);
  end_time = new FormControl('', [Validators.required, Validators.pattern(/\d+:\d+/)]);

  constructor(
    public dialogRef: MatDialogRef<NewcourseFormComponent>
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    if (
      this.code.invalid
      || this.name.invalid
      || this.venue.invalid
      || this.day.invalid
      || this.start_time.invalid
      || this.end_time.invalid
      ) return;

    this.dialogRef.close(this.newCourse);
  }
}