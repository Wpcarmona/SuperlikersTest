import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert-card-view',
  templateUrl: './alert-card-view.component.html',
  styleUrls: ['./alert-card-view.component.scss'],
  standalone:true,
})
export class AlertCardViewComponent {

  @Output() closeCard = new EventEmitter<void>(); 

  title: string = 'Error';
  @Input() message: string = '';
  @Input() showCard: boolean = false;

  onClose() {
    this.closeCard.emit();
  }

}
