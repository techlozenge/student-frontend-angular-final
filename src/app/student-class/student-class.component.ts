import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css'],
  animations: [fadeInAnimation]
})
export class StudentClassComponent implements OnInit, AfterViewInit {

  events: any[];
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';

  displayedColumns = ['student_class_id', 'last_name', 'first_name', 'class', 'edit', 'delete'];

  studentclass: any;
  dataSource: any;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatSort;

  ngOnInit() {
    console.log('in OnInit');
  }

constructor (private dataService: DataService, public dialog: MatDialog) {
  console.log('in constructor');
  this.getStudentClass();
}

  ngAfterViewInit(): void {
    // console.log(' in ngAfterViewInit');
  }

  onRowClicked(row: any) {
    // console.log('Row clicked: ', row);
  }

  onSortData(event: any) {
    // console.log('event: ', event);
  }

  getStudentClass() {
    this.dataService.getRecords('student_class')
      .subscribe(
        studentclass => {
          console.log('in getStudentClass');
          this.dataSource = new MatTableDataSource(studentclass);
          console.log('', this.dataSource.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          return this.studentclass = studentclass;
        },
        error => this.errorMessage = <any>error
        )
  }

  deleteStudentClass(id: number, str: string) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord('student_class', id)
          .subscribe(
            studentclass => {this.successMessage = 'Record(s) deleted succesfully'; this.getStudentClass(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }
}
