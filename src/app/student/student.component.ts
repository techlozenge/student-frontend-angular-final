import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subject } from 'rxjs/Rx';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [fadeInAnimation]
})
export class StudentComponent implements OnInit {


  displayedColumns = ['ID', 'Last Name', 'First Name', 'Start Date', 'GPA', 'SAT Score', 'Major'];
  dataSource: MatTableDataSource<StudentData>;
  @ViewChild(MatPaginator, {static: false}) MatPaginator: any;
  @ViewChild(MatSort, {static: false}) MatSort: any;
  paginator: MatPaginator;
  sort: MatSort;


  // students: any[];
  students: StudentData[] = [];

  events: any[];
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';

  constructor (private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getStudents();

    this.dataSource = new MatTableDataSource(this.students);
  }


  /*
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  firstName: string;
  startDate: string;
  gpa: string;
  satScore: string;
  major: string;
}
