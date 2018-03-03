import { Component, OnInit,Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { fadeInAnimation } from '../animations/fade-in.animation';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css'],
  animations: [fadeInAnimation]
})
export class StudentClassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  studentclass: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MatDialog) {}
 
  ngOnInit() { this.getStudentClass(); }
 
  getStudentClass() {
    this.dataService.getRecords("student_class")
      .subscribe(
        studentclass => this.studentclass = studentclass,
        error =>  this.errorMessage = <any>error);
  }

  deleteStudentClass(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("student_class", id)
          .subscribe(
            studentclass => {this.successMessage = "Record(s) deleted succesfully"; this.getStudentClass(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
