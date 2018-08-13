import 'rxjs/add/operator/switchMap';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
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
  
  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("major_class", +params['id']))
      .subscribe(majorclass => this.majorclass = majorclass);
  }

// methods to populate our dropdowns
    getMajors(){
    this.dataService.getRecords("major")
      .subscribe(
        majors => {this.majors = majors},
        error =>  this.errorMessage = <any>error);
  }
    getClasses(){
    this.dataService.getRecords("class")
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
        (+params['id']) ? this.getRecordForEdit() : null;
      });

      // populate the dropdowns
      this.getMajors();
      this.getClasses();
  }

  // "majorclass" in this instance is the form that is passed to this method from the view
  saveMajorClass(majorclass: NgForm){
    if(typeof majorclass.value.major_class_id === "number"){
      this.dataService.editRecord("major_class", majorclass.value, majorclass.value.major_class_id)
          .subscribe(
            majorclass => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
    } else {
      this.dataService.addRecord("major_class", majorclass.value)
          .subscribe(
            majorclass => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
    }
    this.majorclass = {};

    this.location.back();
  }

}
