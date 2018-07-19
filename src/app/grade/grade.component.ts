import { Component, OnInit,Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { fadeInAnimation } from '../animations/fade-in.animation';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
  animations: [fadeInAnimation]
})
export class GradeComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  grades: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MatDialog) {}
 
  ngOnInit() { this.getGrades(); }
 
  getGrades() {
    this.dataService.getRecords("grade")
      .subscribe(
        grades => this.grades = grades,
        error =>  this.errorMessage = <any>error);
  }

  deleteGrade(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("grade", id)
          .subscribe(
            grade => {this.successMessage = "Record(s) deleted succesfully"; this.getGrades(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
