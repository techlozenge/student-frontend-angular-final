import { Component, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log(this.data);
  }

}
