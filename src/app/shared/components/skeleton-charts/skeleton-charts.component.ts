import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-charts',
  templateUrl: './skeleton-charts.component.html',
  styleUrls: ['./skeleton-charts.component.scss'],
  standalone:true
})
export class SkeletonChartsComponent implements OnInit {
  @Input() percentage: number = 0;  // Porcentaje de progreso
  @Input() label: string = '';      // Etiqueta debajo del círculo
  color: string = '#7894d2';        // Color del círculo
  strokeDashoffset: number = 326;   // Offset del stroke

  ngOnInit(): void {
    this.updateProgress();
  }

  updateProgress() {
    // Fórmula para calcular el offset del círculo basado en el porcentaje
    this.strokeDashoffset = 326 - (this.percentage / 100) * 326;

    // Definir el color según el porcentaje (ejemplo de colores por porcentaje)
    if (this.percentage <= 25) {
      this.color = 'linear-gradient(#ff8485, #ff595a)';
    } else if (this.percentage <= 50) {
      this.color = 'linear-gradient(#ff9015, #ffc600)';
    } else if (this.percentage <= 75) {
      this.color = 'linear-gradient(#b1fdf3, #65baaf)';
    } else {
      this.color = 'linear-gradient(#385cad, #7894d2)';
    }
  }
}
