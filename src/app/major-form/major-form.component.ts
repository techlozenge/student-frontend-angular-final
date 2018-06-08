import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { fadeInAnimation } from '../animations/fade-in.animation';
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

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("major", +params['id']))
      .subscribe(major => this.major = major);
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

  saveMajor(id){
    if(typeof id === "number"){
      this.dataService.editRecord("major", this.major, id)
          .subscribe(
            major => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("major", this.major)
          .subscribe(
            major => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }
    this.major = {};
  }

}
