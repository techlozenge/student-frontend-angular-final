import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';

import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [fadeInAnimation]

})
export class StudentComponent implements OnInit {

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  errorMessage: string;
  successMessage: string;
  students: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit(): void {
    this.dtOptions = {
      paging: true,
      searching: true,
      dom: 'Bfrtlip',
      buttons: [
        'copy',
        'print',
        'excel'
      ]
    }
    this.getStudents();
  }
 
  getStudents() {
    this.dataService.getRecords("student")
      .subscribe(
        students => this.students = students,
        error =>  this.errorMessage = <any>error);
  }

  deleteStudent(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("student", id)
          .subscribe(
            student => {this.successMessage = "Record(s) deleted succesfully"; this.getStudents(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
