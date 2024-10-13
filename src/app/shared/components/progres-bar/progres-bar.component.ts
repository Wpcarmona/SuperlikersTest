import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progres-bar',
  templateUrl: './progres-bar.component.html',
  styleUrls: ['./progres-bar.component.scss'],
  standalone:true
})
export class ProgresBarComponent {

  @Input() max: number = 100; 
  @Input() current: number = 40;

  constructor() { }

  get progressWidth(): string {
    const percentage = (this.current / this.max) * 100;
    return `${percentage}%`;
  }

  get circleWidth(): string {
    const percentage = (this.current / this.max) * 100;
    return `calc(${percentage}% - 20px)`;
  }

}
