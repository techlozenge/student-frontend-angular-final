import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';


@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css'],
  animations: [fadeInAnimation],
})
export class InstructorFormComponent implements OnInit {

  instructorForm: NgForm;
  @ViewChild('instructorForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  instructor: object = {};
  majors: object[];

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("instructor", +params['id']))
      .subscribe(instructor => this.instructor = instructor);
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

  saveInstructor(instructor: NgForm){
    if(typeof instructor.value.instructor_id === "number"){
      this.dataService.editRecord("instructor", instructor.value, instructor.value.instructor_id)
          .subscribe(
            instructor => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
    } else {
      this.dataService.addRecord("instructor", instructor.value)
          .subscribe(
            instructor => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
            this.instructor = {};
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.instructorForm = this.currentForm;
    this.instructorForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.instructorForm.form;

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
    'major_id': '',
    'years_of_experience': '',
    'tenured': ''
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
    'major_id': {
      'pattern': 'Major ID must be a decimal'
    },
    'years_of_experience': {
      'required': 'Years of experience is required',
      'pattern': 'Years of Experience must be a decimal'
    },
    'tenured': {
//      'pattern': 'Enter "true" if tenured, "false" if not'
      'required': 'Tenured is required',
      'pattern': 'Enter "1" if tenured, "0" if not',
      'maxlength': 'Tenured cannot be more than 1 character.'
    }
  };

}
