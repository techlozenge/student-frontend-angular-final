import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
  animations: [fadeInAnimation]
})
export class InstructorComponent implements OnInit, AfterViewInit {

  events: any[];
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';

  // displayedColumns = ['instructor_id', 'last_name', 'first_name', 'major', 'years_of_experience', 'tenured', 'edit', 'delete'];
  displayedColumns = ['instructor_id', 'last_name', 'first_name', 'major', 'years_of_experience', 'tenured'];

  instructors: any;
  dataSource: any;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatSort;

  ngOnInit() {
    console.log('in OnInit');
  }

constructor (private dataService: DataService, public dialog: MatDialog) {
  console.log('in constructor');
  this.getInstructors();
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

  getInstructors() {
    this.dataService.getRecords('instructor')
      .subscribe(
        instructors => {
          console.log('in getInstructors');
          this.dataSource = new MatTableDataSource(instructors);
          console.log('', this.dataSource.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          return this.instructors = instructors;
        },
        error => this.errorMessage = <any>error
        )
  }

  deleteInstructor(id: number, str: string) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord('instructor', id)
          .subscribe(
            instructor => {this.successMessage = 'Record(s) deleted succesfully'; this.getInstructors(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }
}
