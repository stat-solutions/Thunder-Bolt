import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(){


  }


  title = 'thunder-bolt-app';

  updateME(): any{

    this.title='Code 11 class';
  }
}
