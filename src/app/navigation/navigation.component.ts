import { Component, OnInit } from '@angular/core';

declare function doWebSearch(): any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  srchText: string;

  constructor() {}

  ngOnInit() {
  }

  doWebSearch(srchText: string) {
    console.log("doing a web search using " + srchText);
    window.open("http://www.google.com/search?q=" + srchText, "Search");
  }

}
