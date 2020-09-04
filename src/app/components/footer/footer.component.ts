import { Component, OnInit } from '@angular/core';
import clippy from 'clippyjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private static AGENT_NAME = new Array('Merlin', 'Links', 'Genius', 'Genie', 'Clippy', 'F1', 'Rocky', 'Rover', 'Peedy', 'Bonzi');

  constructor() { }

  ngOnInit() {
    this.loadClippy();
  }

   loadClippy() {
        clippy.load(this.randomAgent(), (agent) => {
            agent.show();
            agent.animate();
        });
    }

    randomAgent(): string {
      const randomNum = Math.floor(Math.random() * FooterComponent.AGENT_NAME.length);
      return FooterComponent.AGENT_NAME[randomNum];
  }

}
