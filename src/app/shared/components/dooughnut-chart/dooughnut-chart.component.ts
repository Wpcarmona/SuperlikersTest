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
  @Input() index: number = 0;
  @Input() percentage: number = 0;    
  @Input() max: number = 1;
  @Input() actual: number = 1; 
  @Input() label: string = 'Texto'; 

  strokeDashoffset: number = 0;
  circumference: number = 326; 

  constructor(
    private helperFunction: HelperFunctionServices
  ) { }

  ngOnInit(): void {
    this.getPercent(this.max, this.actual);
    this.setShadowColor();
  }

  getPercent(max: number, actual: number) {
    const number = this.helperFunction.calcularPorcentaje(max, actual);
    this.label = this.helperFunction.replaceUnderscoresWithSpaces(this.label);
    this.percentage = number === 0 ? 100 : number; // Si el porcentaje es 0, se llena completo
    this.setProgress(this.percentage);
  }

  setProgress(percentage: number): void {
    this.strokeDashoffset = this.circumference - (percentage / 100) * this.circumference;
    // Actualizar el valor en CSS
    document.documentElement.style.setProperty('--progress-dashoffset', `${this.strokeDashoffset}`);
  }

  setShadowColor(): void {
    document.documentElement.style.setProperty('--progress-shadow-color', this.color);
  }
}
