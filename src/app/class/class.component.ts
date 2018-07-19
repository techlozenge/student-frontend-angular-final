import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { fadeInAnimation } from '../animations/fade-in.animation';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
  animations: [fadeInAnimation]
})
export class ClassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  classes: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MatDialog) {}
 
  ngOnInit() { this.getClasses(); }
 
  getClasses() {
    this.dataService.getRecords("class")
      .subscribe(
        classes => this.classes = classes,
        error =>  this.errorMessage = <any>error);
  }

  deleteClass(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("class", id)
          .subscribe(
            classy => {this.successMessage = "Record(s) deleted succesfully"; this.getClasses(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}

