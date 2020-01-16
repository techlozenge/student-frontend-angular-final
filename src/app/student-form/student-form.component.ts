import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  animations: [fadeInAnimation]
})
export class StudentFormComponent implements OnInit {

  studentForm: NgForm;
  @ViewChild('studentForm', { static: true }) currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  student: object;
  majors: object[];

  students: any;
  dataSource: any;

  formErrors = {
    'first_name': '',
    'last_name': '',
    'sat': '',
    'start_date': ''
  };

  validationMessages = {
    'first_name': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 30 characters long.'
    },
    'last_name': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 30 characters long.'
    },
    'sat': {
      'pattern': 'Sat score must be between 400 and 1600',
      'maxlength': 'Sat cannot be more than 4 characters long.'
    },
    'start_date': {
      'pattern': 'Start date should be in the following format: YYYY-MM-DD'
    }
  };

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord('student', +params['id']))
      .subscribe(student => this.student = student);
  }

  getMajors() {
    this.dataService.getRecords('major')
      .subscribe(
        majors => {this.majors = majors},
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
        (+params['id']) ? this.getRecordForEdit() : null;
      });
        this.getMajors();
  }

  // 2018-08-21: If the update or add is successful, send the user back to the list
  //             otherwise display the error.
  saveStudent(student: NgForm) {
    if (typeof student.value.student_id === 'number') {
      this.dataService.editRecord('student', student.value, student.value.student_id)
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            student => this.location.back(),
            error =>  this.errorMessage = <any>error);
    } else {
      this.dataService.addRecord('student', student.value)
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            student => this.location.back(),
            error =>  this.errorMessage = <any>error);
    }
    this.student = {};
  }

  // saveStudent(student: NgForm){
  //   if(typeof student.value.student_id === "number"){
  //     this.dataService.editRecord("student", student.value, student.value.student_id)
  //         .subscribe(
  //           student => this.successMessage = "Record updated successfully",
  //           error =>  this.errorMessage = <any>error);
  //   }else{
  //     this.dataService.addRecord("student", student.value)
  //         .subscribe(
  //           student => this.successMessage = "Record added successfully",
  //           error =>  this.errorMessage = <any>error);
  //   }
  //   this.student = {};
  //   this.location.back();
  // }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.studentForm = this.currentForm;
    this.studentForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    const form = this.studentForm.form;

    for (const field of Object.keys(this.formErrors)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  deleteStudent(id: number, str: string) {
    console.log('in deleteStudent for student ', id);
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('deleting student ', id);
        this.dataService.deleteRecord('student', id)
          .subscribe(
            student => this.location.back(),
            error => this.errorMessage = <any>error);
      }
    });
  }

}
