import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-content',
  templateUrl: './tabs-content.component.html',
  styleUrls: ['./tabs-content.component.scss'],
  standalone:true
})
export class TabsContentComponent {

  selectedButtonIndex: number = 0;

  constructor() { }

  selectButtonTab(event: Event, index: number) {
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach((button) => button.classList.remove('active'));
    const clickedButton = event.currentTarget as HTMLElement;
    clickedButton.classList.add('active');
    this.selectedButtonIndex = index;
  }
}
