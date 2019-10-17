import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subject } from 'rxjs/Rx';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [fadeInAnimation]
})
export class StudentComponent implements OnInit {

  students: any[];
  events: any[];
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';
  pageSize = 1;
  pageSizeOptions = [1, 5, 10, 50];
  displayedColumns = ['student_id', 'last_name', 'first_name'];
  dataSource: MatTableDataSource<StudentData>;
  paginator: MatPaginator;
  sort: MatSort;

  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  // @ViewChild(MatSort, {static: false}) set matSort(ms: MatSort) {
  //   this.sort = ms;
  //   this.setDataSourceAttributes();
  // }

  constructor (private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getStudents();
    this.dataSource = new MatTableDataSource(this.students);
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    if (this.paginator) {
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getStudents() {
    this.dataService.getRecords('student')
      .subscribe(
        students => this.students = students,
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
  start_date: string;
  gpa: string;
  satScore: string;
  major: string;
}
