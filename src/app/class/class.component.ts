import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
  animations: [fadeInAnimation]
})
export class ClassComponent implements OnInit, AfterViewInit {

  events: any[];
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';

  // tslint:disable-next-line:max-line-length
  // displayedColumns = ['class_id', 'instructor_last_name', 'instructor_first_name', 'instructor-years_of_experience', 'subject', 'course', 'edit', 'delete'];
  displayedColumns = ['class_id', 'instructor_last_name', 'instructor_first_name', 'instructor-years_of_experience', 'subject', 'course'];

  classes: any;
  dataSource: any;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatSort;

  ngOnInit() {
    console.log('in OnInit');
  }

constructor (private dataService: DataService, public dialog: MatDialog) {
  console.log('in constructor');
  this.getClasses();
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

  getClasses() {
    this.dataService.getRecords('class')
      .subscribe(
        classes => {
          console.log('in getclasses');
          this.dataSource = new MatTableDataSource(classes);
          console.log('', this.dataSource.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          return this.classes = classes;
        },
        error => this.errorMessage = <any>error
        )
  }

  deleteClass(id: number, str: string) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord('class', id)
          .subscribe(
            classes => {this.successMessage = 'Record(s) deleted succesfully'; this.getClasses(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }
}
