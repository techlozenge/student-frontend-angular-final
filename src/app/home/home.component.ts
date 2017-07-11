import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
