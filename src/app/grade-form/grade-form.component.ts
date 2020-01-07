import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { DataService } from '../data.service'

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.css'],
  animations: [fadeInAnimation]
})
export class GradeFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  grade: object = {};

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord('grade', +params['id']))
      .subscribe(grade => this.grade = grade);
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

  }

  // 2018-08-21: If the update or add is successful, send the user back to the list
  //             otherwise display the error.
  saveGrade(id: number) {
    if (typeof id === 'number') {
      this.dataService.editRecord('grade', this.grade, id)
          .subscribe(
            grade => this.location.back(),
            error =>  this.errorMessage = <any>error);
    } else {
      this.dataService.addRecord('grade', this.grade)
          .subscribe(
            grade => this.location.back(),
            error =>  this.errorMessage = <any>error);
    }
    this.grade = {};
  }

  deleteGrade(id: number, str: string) {
    console.log('in deleteGrade for Grade ', id);
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('deleting grade ', id);
        this.dataService.deleteRecord('grade', id)
          .subscribe(
            grade => this.location.back(),
            error => this.errorMessage = <any>error);
      }
    });
  }

}
