import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service'

@Component({
  selector: 'app-major-form',
  templateUrl: './major-form.component.html',
  styleUrls: ['./major-form.component.css'],
  animations: [fadeInAnimation]
})
export class MajorFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  major: object = {};

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord('major', +params['id']))
      .subscribe(major => this.major = major);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        // tslint:disable-next-line:no-unused-expression
        (+params['id']) ? this.getRecordForEdit() : null;
      });

  }

  // 2018-08-21: If the update or add is successful, send the user back to the list
  //             otherwise display the error.
  saveMajor(id: number) {
    if (typeof id === 'number') {
      this.dataService.editRecord('major', this.major, id)
          .subscribe(
            major => this.location.back(),
            error =>  this.errorMessage = <any>error);
    } else {
      this.dataService.addRecord('major', this.major)
          .subscribe(
            major => this.location.back(),
            error =>  this.errorMessage = <any>error);
    }
    this.major = {};
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
              major => this.location.back(),
              error =>  this.errorMessage = <any>error);
      }
    });
  }

}
