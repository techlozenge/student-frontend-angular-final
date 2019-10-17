import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subject } from 'rxjs/Rx';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [fadeInAnimation]
})
export class StudentComponent implements OnInit, AfterViewInit {

  students: any[];
  events: any[];
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';

  displayedColumns = ['student_id', 'last_name', 'first_name'];

  dataSource: MatTableDataSource<StudentData>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

constructor (private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getStudents();
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log('hit ngOnInit');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('hit ngAfterViewInit');
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
