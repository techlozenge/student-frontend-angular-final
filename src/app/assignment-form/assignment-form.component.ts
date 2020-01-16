import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css'],
  animations: [fadeInAnimation]
})
export class AssignmentFormComponent implements OnInit {

  assignmentForm: NgForm;
  @ViewChild('assignmentForm', { static: true }) currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

 // assignment: object = {};

  assignment: object;
  student: object[];
  grade: object[];
  classy: object[];

  formErrors = {
    'assignment_nbr': ''
  };

  validationMessages = {
    'assignment_nbr': {
      'pattern': 'Assignment Number must be a number.',
      'required': 'Must enter a number.'
    }
  };

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
    ) {}

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord('assignment', +params['id']))
      .subscribe(assignment => this.assignment = assignment);
  }

  getStudent() {
    this.dataService.getRecords('student')
      .subscribe(
        students => {this.student = students},
        error =>  this.errorMessage = <any>error);
  }

  getGrade() {
    this.dataService.getRecords('grade')
      .subscribe(
        grade => {this.grade = grade},
        error =>  this.errorMessage = <any>error);
  }

  getClass() {
    this.dataService.getRecords('class')
      .subscribe(
        classy => {this.classy = classy},
        error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        // tslint:disable-next-line:no-unused-expression
        (+params['id']) ? this.getRecordForEdit() : null;
      });
      this.getStudent();
      this.getGrade();
      this.getClass();

  }

  // 2018-08-21: If the update or add is successful, send the user back to the list
  //             otherwise display the error.
  saveAssignment(assignment: NgForm) {
    if (typeof assignment.value.assignment_id === 'number') {
      this.dataService.editRecord('assignment', assignment.value, assignment.value.assignment_id)
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            assignment => this.location.back(),
            error =>  this.errorMessage = <any>error);
    }else {
      this.dataService.addRecord('assignment', assignment.value)
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            assignment => this.location.back(),
            error =>  this.errorMessage = <any>error);
    }
    this.assignment = {};
  }

  // tslint:disable-next-line:use-lifecycle-interface
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
    const form = this.assignmentForm.form;


//    for (let field in this.formErrors) {
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

  deleteAssignment(id: number, str: string) {
      const dialogRef = this.dialog.open(DeleteConfirmComponent, {
        data: {
          dataKey: id,
          value: str
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dataService.deleteRecord('assignment', id)
            .subscribe(
              assignment => this.location.back(),
              error =>  this.errorMessage = <any>error);
        }
      });
    }

}
