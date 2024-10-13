import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  standalone:true
})
export class SelectListComponent  {

  @Output() selectionChange = new EventEmitter<string>();

  constructor() { }

  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; 
    this.selectionChange.emit(selectElement.value); 
  }
 

}
