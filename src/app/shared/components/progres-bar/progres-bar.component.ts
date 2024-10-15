import { Component, Input, OnInit } from '@angular/core';
import { HelperFunctionServices } from 'src/utils/helper-function.service';

@Component({
  selector: 'app-progres-bar',
  templateUrl: './progres-bar.component.html',
  styleUrls: ['./progres-bar.component.scss'],
  standalone: true
})
export class ProgresBarComponent implements OnInit {

  @Input() max: number = 100; 
  @Input() current: number = 40;

  actualPercent: number = 0;
  progressWidth: string = '0%';  
  circleWidth: string = 'calc(0% - 20px)'; 

  constructor(
    private helperFunction: HelperFunctionServices
  ) { }

  ngOnInit(): void {
    console.log('actual',this.current,'max',this.max)
    setTimeout(() => {
      this.updateProgress();
    }, 100); 
  }

  updateProgress(): void {
    const percentage = this.helperFunction.calcularPorcentaje(this.max, this.current);
    this.actualPercent = percentage;
    this.progressWidth = `${percentage}%`;
    this.circleWidth = `calc(${percentage}% - 20px)`;  
  }
}
