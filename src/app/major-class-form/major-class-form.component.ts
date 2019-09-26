import 'rxjs/add/operator/switchMap';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'

@Component({
  selector: 'app-major-class-form',
  templateUrl: './major-class-form.component.html',
  styleUrls: ['./major-class-form.component.css'],
  animations: [fadeInAnimation]
})

export class MajorClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  majorclass: object = {};

  // objects to contain our dropdown methods
  majors: object[];
  classes: object[];

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord('major_class', +params['id']))
      .subscribe(majorclass => this.majorclass = majorclass);
  }

// methods to populate our dropdowns
    getMajors() {
    this.dataService.getRecords('major')
      .subscribe(
        majors => {this.majors = majors},
        error =>  this.errorMessage = <any>error);
  }
    getClasses() {
    this.dataService.getRecords('class')
      .subscribe(
        classes => {this.classes = classes},
        error =>  this.errorMessage = <any>error);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        // tslint:disable-next-line:no-unused-expression
        (+params['id']) ? this.getRecordForEdit() : null;
      });

      // populate the dropdowns
      this.getMajors();
      this.getClasses();
  }

  // 2018-08-21: If the update or add is successful, send the user back to the list
  //             otherwise display the error.
  saveMajorClass(majorclass: NgForm) {
    if (typeof majorclass.value.major_class_id === 'number') {
      this.dataService.editRecord('major_class', majorclass.value, majorclass.value.major_class_id)
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            majorclass => this.location.back(),
            error =>  this.errorMessage = <any>error);
    } else {
      this.dataService.addRecord('major_class', majorclass.value)
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            majorclass => this.location.back(),
            error =>  this.errorMessage = <any>error);
    }
    this.majorclass = {};
  }

}
