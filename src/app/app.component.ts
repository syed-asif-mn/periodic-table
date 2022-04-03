import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  landScape = window.matchMedia("(orientation: landscape)");

  constructor() {
    this.landScape.addEventListener("change", () => {
      if (this.landScape.matches) {
       // alert('Landscape mode not fully supported. Please switch back to Portrait mode.')
      }
    });
  }
}
