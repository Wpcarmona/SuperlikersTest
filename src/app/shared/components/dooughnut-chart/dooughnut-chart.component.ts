import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dooughnut-chart',
  templateUrl: './dooughnut-chart.component.html',
  styleUrls: ['./dooughnut-chart.component.scss'],
  standalone:true
})
export class DooughnutChartComponent implements OnInit {
  @Input() color: string = '#00c8ff'; 
  @Input() percentage: number = 0;     
  @Input() label: string = 'Texto'; 

  strokeDashoffset: number = 0;
  circumference: number = 326; 

  constructor() { }

  ngOnInit(): void {
    this.setProgress(this.percentage);
    this.setShadowColor();
  }

  setProgress(percentage: number): void {
    this.strokeDashoffset = this.circumference - (percentage / 100) * this.circumference;
    
  }

  setShadowColor(): void {
    document.documentElement.style.setProperty('--progress-shadow-color', this.color);
  }

}
