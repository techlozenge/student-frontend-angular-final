import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { fadeInAnimation } from '../animations/fade-in.animation';

import { DataService } from '../data.service'

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css'],
  animations: [fadeInAnimation]
})
export class ClassFormComponent implements OnInit {

  classForm: NgForm;
  @ViewChild('classForm', { static: true }) currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  classy: object = {};
  instructors: object[];

  formErrors = {
    'instructor': '',
    'subject': '',
    'course': ''
  };

  validationMessages = {
    'instructor': {
      'required': 'Instructor is required.'
    },
    'subject': {
      'required': 'Subject is required.'
    },
    'course': {
      'pattern': 'Course must be numeric',
      'required': 'Course is required.',
      'maxLength': 'Course cannot exceed 4 digits'
    }
  };

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord('class', +params['id']))
      .subscribe(classy => this.classy = classy);
  }

  getInstructors() {
    this.dataService.getRecords('instructor')
      .subscribe(
        instructors => {this.instructors = instructors},
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
        // tslint:disable-next-line:no-unused-expression
        (+params['id']) ? this.getRecordForEdit() : null;
      });
      this.getInstructors();
  }

  // 2018-08-21: If the update or add is successful, send the user back to the list
  //             otherwise display the error.
  saveClass(classy: NgForm) {
    if (typeof classy.value.class_id === 'number') {
      this.dataService.editRecord('class', classy.value, classy.value.class_id)
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            classy => this.location.back(),
            error =>  this.errorMessage = <any>error);
    } else {
      this.dataService.addRecord('class', classy.value)
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            classy => this.location.back(),
            error =>  this.errorMessage = <any>error);
    }
    this.classy = {};
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.classForm = this.currentForm;
    this.classForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {

    const form = this.classForm.form;

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
}
