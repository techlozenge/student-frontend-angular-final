import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { fadeInAnimation } from '../animations/fade-in.animation';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css'],
  animations: [fadeInAnimation]
})
export class MajorComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  majors: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getMajors(); }
 
  getMajors() {
    this.dataService.getRecords("major")
      .subscribe(
        majors => this.majors = majors,
        error =>  this.errorMessage = <any>error);
  }

  deleteMajor(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("major", id)
          .subscribe(
            major => {this.successMessage = "Record(s) deleted succesfully"; this.getMajors(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
