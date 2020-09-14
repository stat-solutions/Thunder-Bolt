import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  constructor() { }
  areas = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  ngOnInit(): void {
  }

  createArea() {

  }

}
