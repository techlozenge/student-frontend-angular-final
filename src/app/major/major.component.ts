import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css'],
  animations: [fadeInAnimation]
})
export class MajorComponent implements OnInit, AfterViewInit {

  events: any[];
  errorMessage: string;
  successMessage: string;
  mode = 'Observable';

  displayedColumns = ['major_id', 'major', 'edit', 'delete'];

  majors: any;
  dataSource: any;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatSort;

  ngOnInit() {
    console.log('in OnInit');
  }

  constructor (private dataService: DataService, public dialog: MatDialog) {
    console.log('in constructor');
    this.getMajors();
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

    getMajors() {
      this.dataService.getRecords('major')
        .subscribe(
          majors => {
            console.log('in getMajors');
            this.dataSource = new MatTableDataSource(majors);
            console.log('', this.dataSource.data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            return this.majors = majors;
          },
          error => this.errorMessage = <any>error
          )
    }

    deleteMajor(id: number, str: string) {
      const dialogRef = this.dialog.open(DeleteConfirmComponent, {
        data: {
          dataKey: id,
          value: str
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dataService.deleteRecord('major', id)
            .subscribe(
              major => {this.successMessage = 'Record(s) deleted succesfully'; this.getMajors(); },
              error =>  this.errorMessage = <any>error);
        }
      });
    }
}
