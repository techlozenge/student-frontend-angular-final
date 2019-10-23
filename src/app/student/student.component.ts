import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [fadeInAnimation]
})
export class StudentComponent implements OnInit, AfterViewInit {

  events: any[];
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';

  displayedColumns = ['student_id', 'last_name', 'first_name', 'start_date', 'gpa', 'sat', 'major'];

  students: any;

  dataSource: any;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatSort;

  ngOnInit() {
    console.log('in OnInit');
  }

constructor (private dataService: DataService, public dialog: MatDialog) {
  console.log('in constructor');
  this.getStudents();
}

  ngAfterViewInit(): void {
    console.log(' in ngAfterViewInit');
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

  onSortData(event: any) {
    console.log('event: ', event);
  }

  getStudents() {
    this.dataService.getRecords('student')
      .subscribe(
        students => {
          console.log('in getStudents');
          this.dataSource = new MatTableDataSource(students);
          console.log('', this.dataSource.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          return this.students = students;
        },
        error => this.errorMessage = <any>error
        )
  }

  deleteStudent(id: number, str: string) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord('student', id)
          .subscribe(
            student => {this.successMessage = 'Record(s) deleted succesfully'; this.getStudents(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }
}

export interface StudentData {
  student_id: string;
  last_name: string;
  first_name: string;
  start_data: string;
  gpa: number;
  sat: number;
}
