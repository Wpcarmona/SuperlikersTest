import { Component, Input, OnInit } from '@angular/core';
import { HelperFunctionServices } from 'src/utils/helper-function.service';

@Component({
  selector: 'app-dooughnut-chart',
  templateUrl: './dooughnut-chart.component.html',
  styleUrls: ['./dooughnut-chart.component.scss'],
  standalone:true
})
export class DooughnutChartComponent implements OnInit {
  @Input() color: string = '#00c8ff'; 
  @Input() index:number = 0;
  @Input() percentage: number = 0;    
  @Input() max:number = 1;
  @Input() actual:number= 1; 
  @Input() label: string = 'Texto'; 

  strokeDashoffset: number = 0;
  circumference: number = 326; 

  private colors: string[] = ['#385cad', '#b1fdf3', '#ff8485', '#ff9015'];

  constructor(
    private helperFunction:HelperFunctionServices
  ) { }

  ngOnInit(): void {
    // this.setProgress(this.percentage);
    this.getPercent(this.max, this.actual);
    this.setShadowColor();
  }

  getPercent(max: number, actual: number) {
    const number = this.helperFunction.calcularPorcentaje(max, actual);
    this.label = this.helperFunction.replaceUnderscoresWithSpaces(this.label)
    this.percentage = number;
    this.setProgress(number);
  }

  setProgress(percentage: number): void {
    this.strokeDashoffset = this.circumference - (percentage / 100) * this.circumference;
  }

  setShadowColor(): void {
    const colorIndex = this.index % this.colors.length;
    const color = this.colors[colorIndex];

    document.documentElement.style.setProperty('--progress-shadow-color', color);
  }

}
