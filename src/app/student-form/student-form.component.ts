import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  animations: [fadeInAnimation]
})
export class StudentFormComponent implements OnInit {

  studentForm: NgForm;
  @ViewChild('studentForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  student: object;
  majors: object[];

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("student", +params['id']))
      .subscribe(student => this.student = student);
  }

  getMajors(){
    this.dataService.getRecords("major")
      .subscribe(
        majors => {this.majors = majors},
        error =>  this.errorMessage = <any>error);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
        this.getMajors();
  }

  saveStudent(student: NgForm){
    if(typeof student.value.student_id === "number"){
      this.dataService.editRecord("student", student.value, student.value.student_id)
          .subscribe(
            student => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("student", student.value)
          .subscribe(
            student => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
    }
    this.student = {};

    this.location.back();
  }

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
    let form = this.studentForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'first_name': '',
    'last_name': '',
    'sat': '',
    'start_date': '',
    'gpa': ''
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
    },
    'gpa': {
      'pattern': 'GPA must be a decimal'
    }
  };
}
