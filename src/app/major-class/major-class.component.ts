import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-major-class',
  templateUrl: './major-class.component.html',
  styleUrls: ['./major-class.component.css'],
  animations: [fadeInAnimation]
})
export class MajorClassComponent implements OnInit, AfterViewInit {

  events: any[];
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';

  displayedColumns = ['major_class_id', 'major_class.major', 'class', 'edit', 'delete'];

  majorclass: any;
  dataSource: any;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatSort;

  ngOnInit() {
    console.log('in OnInit');
  }

constructor (private dataService: DataService, public dialog: MatDialog) {
  console.log('in constructor');
  this.getMajorClass();
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

  getMajorClass() {
    this.dataService.getRecords('major_class')
      .subscribe(
        majorclass => {
          console.log('in getMajorClass');
          this.dataSource = new MatTableDataSource(majorclass);
          console.log('', this.dataSource.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          return this.majorclass = majorclass;
        },
        error => this.errorMessage = <any>error
        )
  }

  deleteMajorClass(id: number, str: string) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {
        dataKey: id,
        value: str
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord('major_class', id)
          .subscribe(
            majorclass => {this.successMessage = 'Record(s) deleted succesfully'; this.getMajorClass(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }
}
