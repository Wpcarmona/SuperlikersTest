import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FooterTabComponent } from 'src/app/shared/components/footer-tab/footer-tab.component';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { TabsContentComponent } from 'src/app/shared/components/tabs-content/tabs-content.component';
import { BannerContentComponent } from "../../shared/components/banner-content/banner-content.component";
 // Importar el FooterTabComponent

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FooterTabComponent,
    HeaderComponent,
    TabsContentComponent,
    BannerContentComponent
],
})
export class HomePage {
  selectedButtonIndex: number = 1;

  constructor() {}

  selectButtonFooter(event: Event, index: number) {
    const buttons = document.querySelectorAll('.footer-button');
    buttons.forEach((button) => button.classList.remove('active'));
    const clickedButton = event.currentTarget as HTMLElement;
    clickedButton.classList.add('active');
    this.selectedButtonIndex = index;
  }

  selectButtonTab(event: Event, index: number) {
    const buttons = document.querySelectorAll('.footer-button');
    buttons.forEach((button) => button.classList.remove('active'));
    const clickedButton = event.currentTarget as HTMLElement;
    clickedButton.classList.add('active');
    this.selectedButtonIndex = index;
  }
}
