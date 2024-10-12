import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FooterTabComponent } from 'src/app/shared/components/footer-tab/footer-tab.component';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { TabsContentComponent } from 'src/app/shared/components/tabs-content/tabs-content.component';
import { BannerContentComponent } from "../../shared/components/banner-content/banner-content.component";
import { ScheduleNotificationsService } from 'src/app/core/utils/notification/notificationshedule/schedule-notifications.service';
import { PushNotificationService } from 'src/app/core/utils/notification/pushNotification/push-notification.service';
import { DeviceService } from 'src/utils/device-identifier.service';


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
export class HomePage implements OnInit{
  selectedButtonIndex: number = 1;

  constructor(
    private localNotification: ScheduleNotificationsService,
    private pushNotification:PushNotificationService,
    private deviceService: DeviceService
  ) {}

  async ngOnInit() {
    const isIOS = await this.deviceService.isIOS()
    if(isIOS){
      this.localNotification.initializeNotifications();
    }else{
      this.pushNotification.initializePushNotificationsDoc();
    }
    
  }

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
