import 'rxjs/add/operator/switchMap';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-class-form',
  templateUrl: './student-class-form.component.html',
  styleUrls: ['./student-class-form.component.css'],
  animations: [fadeInAnimation]
})

export class StudentClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  studentclass: object = {};

  // objects to contain our dropdown methods
  students: object[];
  classes: object[];

  enabled: boolean;

  getRecordForEdit() {
    this.enabled = true;
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord('student_class', +params['id']))
      .subscribe(studentclass => this.studentclass = studentclass);
  }

  // methods to populate our dropdowns
    getStudents() {
      this.dataService.getRecords('student')
      .subscribe(
        students => {this.students = students},
        error =>  this.errorMessage = <any>error);
  }
    getClasses() {
      this.dataService.getRecords('class')
      .subscribe(
        classes => {this.classes = classes},
        error =>  this.errorMessage = <any>error);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        // tslint:disable-next-line:no-unused-expression
        (+params['id']) ? this.getRecordForEdit() : this.enabled = false;
      });

      // populate the dropdowns
      this.getStudents();
      this.getClasses();
  }

  // 2018-08-21: If the update or add is successful, send the user back to the list
  //             otherwise display the error.
  saveStudentClass(studentclass: NgForm) {
    if (typeof studentclass.value.student_class_id === 'number') {
      this.dataService.editRecord('student_class', studentclass.value, studentclass.value.student_class_id)
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            studentclass => this.location.back(),
            error =>  this.errorMessage = <any>error);
    } else {
      this.dataService.addRecord('student_class', studentclass.value)
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            studentclass => this.location.back(),
            error =>  this.errorMessage = <any>error);
    }
    this.studentclass = {};
  }

  deleteStudentClass(id: number, str: string) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord('student_class', id)
          .subscribe(
            studentclass => this.location.back(),
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
