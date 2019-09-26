import { Component, OnInit,Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
  animations: [fadeInAnimation],
})
export class InstructorComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  instructors: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MatDialog) {}
 
  ngOnInit() { this.getInstructor(); }
 
  getInstructor() {
    this.dataService.getRecords("instructor")
      .subscribe(
        instructors => this.instructors = instructors,
        error =>  this.errorMessage = <any>error);
  }

  deleteInstructor(id:number, str:string) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("instructor", id)
          .subscribe(
            instructor => {this.successMessage = "Record(s) deleted succesfully"; this.getInstructor(); },
             error =>  (this.errorMessage = '***** POSSIBLE FOREIGN KEY CONSTRAINT ******     ' + <any>error));
            //error =>  {(this.errorMessage = 'test'), console.log(this.errorMessage) });
      }
    });
  }

}
