import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-tab',
  templateUrl: './footer-tab.component.html',
  styleUrls: ['./footer-tab.component.scss'],
  standalone:true
})
export class FooterTabComponent {

  selectedButtonIndex: number = 1;

  constructor() { }

  selectButtonFooter(event: Event, index: number) {
    const buttons = document.querySelectorAll('.footer-button');
    buttons.forEach((button) => button.classList.remove('active'));
    const clickedButton = event.currentTarget as HTMLElement;
    clickedButton.classList.add('active');
    this.selectedButtonIndex = index;
  }

}
