import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-content',
  templateUrl: './banner-content.component.html',
  styleUrls: ['./banner-content.component.scss'],
  standalone: true
})
export class BannerContentComponent implements OnInit {

  @Input() img!: string;
  @Input() isLocalImage: boolean = true;
  imgURL: string = '';

  constructor() {}

  ngOnInit(): void {
    // Aquí ya las entradas @Input están inicializadas
    if (this.isLocalImage) {
      this.imgURL = `../../../../assets/${this.img}`;
    } else {
      this.imgURL = this.img;
    }
  }
}
