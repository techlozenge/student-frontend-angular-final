import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { fadeInAnimation } from '../animations/fade-in.animation';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
  animations: [fadeInAnimation]
})
export class AssignmentComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  assignments: any[];
  mode = 'Observable';

  constructor (private dataService: DataService, public dialog: MatDialog) {}
 
  ngOnInit() { this.getAssignments(); }
 
  getAssignments() {
    this.dataService.getRecords("assignment")
      .subscribe(
        assignments => this.assignments = assignments,
        error =>  this.errorMessage = <any>error);  
  }

  deleteAssignment(id:number, str:string) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("assignment", id)
          .subscribe(
            assignment => {this.successMessage = "Record(s) deleted succesfully"; this.getAssignments(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}

