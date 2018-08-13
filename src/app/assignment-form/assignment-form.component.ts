import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { DataService } from '../data.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css'],
  animations: [fadeInAnimation]
})
export class AssignmentFormComponent implements OnInit {

  assignmentForm: NgForm;
  @ViewChild('assignmentForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

 // assignment: object = {};

  assignment: object;
  student: object[];
  grade: object[];
  classy: object[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("assignment", +params['id']))
      .subscribe(assignment => this.assignment = assignment);
  }

  getStudent(){
    this.dataService.getRecords("student")
      .subscribe(
        students => {this.student = students},
        error =>  this.errorMessage = <any>error);
  }

  getGrade(){
    this.dataService.getRecords("grade")
      .subscribe(
        grade => {this.grade = grade},
        error =>  this.errorMessage = <any>error);
  }

  getClass(){
    this.dataService.getRecords("class")
      .subscribe(
        classy => {this.classy = classy},
        error =>  this.errorMessage = <any>error);
  }


  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
      this.getStudent();
      this.getGrade();
      this.getClass();
  
  }

  saveAssignment(assignment: NgForm){
    if(typeof assignment.value.assignment_id === "number"){
      this.dataService.editRecord("assignment", assignment.value, assignment.value.assignment_id)
          .subscribe(
            assignment => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("assignment", assignment.value)
          .subscribe(
            assignment => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }
    this.assignment = {};    

    this.location.back();
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.assignmentForm = this.currentForm;
    this.assignmentForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.assignmentForm.form;

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
    'assignment_nbr': ''
  };

  validationMessages = {
    'assignment_nbr': {
      'pattern': 'Assignment Number must be a number.',
      'required': 'Must enter a number.'
    }
  };

}

