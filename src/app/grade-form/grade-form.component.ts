import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { fadeInAnimation } from '../animations/fade-in.animation';

import { DataService } from '../data.service'

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.css'],
  animations: [fadeInAnimation]
})
export class GradeFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  grade: object = {};

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("grade", +params['id']))
      .subscribe(grade => this.grade = grade);
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
  
  }

  saveGrade(id){
    if(typeof id === "number"){
      this.dataService.editRecord("grade", this.grade, id)
          .subscribe(
            grade => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("grade", this.grade)
          .subscribe(
            grade => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }
    this.grade = {};
  }

}
