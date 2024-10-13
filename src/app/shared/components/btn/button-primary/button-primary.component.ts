import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss'],
  standalone: true,
})
export class ButtonPrimaryComponent {
  @Input() buttonText: string = 'Click me'; 
  @Input() isDisabled: boolean = false; 
  @Input() buttonClass: string = 'btn btn-primary'; 
  @Input() type: string = 'button';

  @Output() Click = new EventEmitter<void>();

  handleClick() {
    if (!this.isDisabled) {
      this.Click.emit();
    }
  }
}
