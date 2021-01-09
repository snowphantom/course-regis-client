import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-newcourse-form',
  templateUrl: './newcourse-form.component.html',
  styleUrls: ['./newcourse-form.component.css']
})
export class NewcourseFormComponent implements OnInit {
  newCourse = new Course();


  constructor(
    public dialogRef: MatDialogRef<NewcourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  animal: string;
  name: string;
}
