import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HelperFunctionServices {

  constructor() { }

  calcularPorcentaje(valorMaximo: number, valorActual: number): number {
    if (valorMaximo === 0) {
      throw new Error("El valor máximo no puede ser cero.");
    }
    
    const porcentaje = (valorActual / valorMaximo) * 100;
    return parseFloat(porcentaje.toFixed(1)); 
  }

  calcularPorcentajeString(valorMaximo: string, valorActual: string): number {
    const maximo = parseFloat(valorMaximo); 
    const actual = parseFloat(valorActual);

    if (maximo === 0) {
      throw new Error("El valor máximo no puede ser cero.");
    }
    
    const porcentaje = (actual / maximo) * 100;
    return parseFloat(porcentaje.toFixed(2)); 
}

replaceUnderscoresWithSpaces(input: string): string {
    return input.replace(/_/g, ' ');
  }


}
