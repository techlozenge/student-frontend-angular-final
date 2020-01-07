import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
  animations: [fadeInAnimation]
})
export class GradeComponent implements OnInit, AfterViewInit {

  events: any[];
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';

  // displayedColumns = ['grade_id', 'grade', 'edit', 'delete'];
  displayedColumns = ['grade_id', 'grade'];

  grades: any;
  dataSource: any;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatSort;

  ngOnInit() {
    // console.log('in OnInit');
  }

constructor (private dataService: DataService, public dialog: MatDialog) {
  this.getgrades();
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

  getgrades() {
    this.dataService.getRecords('grade')
      .subscribe(
        grades => {
          console.log('in getgrades');
          this.dataSource = new MatTableDataSource(grades);
          console.log('', this.dataSource.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          return this.grades = grades;
        },
        error => this.errorMessage = <any>error
        )
  }

  deleteGrade(id: number, str: string) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord('grade', id)
          .subscribe(
            grade => {this.successMessage = 'Record(s) deleted succesfully'; this.getgrades(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }
}
