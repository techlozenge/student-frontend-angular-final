import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
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
  @ViewChild('classForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  classy: object = {};
  instructors: object[];

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("class", +params['id']))
      .subscribe(classy => this.classy = classy);
  }

  getInstructors(){
    this.dataService.getRecords("instructor")
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
        (+params['id']) ? this.getRecordForEdit() : null;
      });
      this.getInstructors();
  }

  saveClass(classy: NgForm){
    console.log("classy.value.class_id is " + classy.value.class_id);
    if(typeof classy.value.class_id === "number"){
      console.log("edit record");
      this.dataService.editRecord("class", classy.value, classy.value.class_id)
          .subscribe(
            classy => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      console.log("add record");
      this.dataService.addRecord("class", classy.value)
          .subscribe(
            classy => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }
    this.classy = {};
  }

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

    let form = this.classForm.form;

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

}
