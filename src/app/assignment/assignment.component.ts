import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
  animations: [fadeInAnimation]
})
export class AssignmentComponent implements OnInit, AfterViewInit {

  events: any[];
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';

  // tslint:disable-next-line:max-line-length
  displayedColumns = ['assignment_id', 'student_last_name', 'student_first_name', 'assignment_nbr', 'grade', 'subject', 'course', 'edit', 'delete'];

  assignments: any;
  dataSource: any;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatSort;

  ngOnInit() {
    console.log('in OnInit');
  }

constructor (private dataService: DataService, public dialog: MatDialog) {
  console.log('in constructor');
  this.getAssignments();
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

  getAssignments() {
    this.dataService.getRecords('assignment')
      .subscribe(
        assignments => {
          console.log('in getassignments');
          this.dataSource = new MatTableDataSource(assignments);
          console.log('', this.dataSource.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          return this.assignments = assignments;
        },
        error => this.errorMessage = <any>error
        )
  }

  deleteAssignment(id: number, str: string) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord('assignment', id)
          .subscribe(
            assignment => {this.successMessage = 'Record(s) deleted succesfully'; this.getAssignments(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }
}
