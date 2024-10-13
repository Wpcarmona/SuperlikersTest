import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FooterTabComponent } from 'src/app/shared/components/footer-tab/footer-tab.component';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { TabsContentComponent } from 'src/app/shared/components/tabs-content/tabs-content.component';
import { BannerContentComponent } from "../../shared/components/banner-content/banner-content.component";
import { ScheduleNotificationsService } from 'src/app/core/utils/notification/notificationshedule/schedule-notifications.service';
import { PushNotificationService } from 'src/app/core/utils/notification/pushNotification/push-notification.service';
import { DeviceService } from 'src/utils/device-identifier.service';
import { SelectListComponent } from "../../shared/components/select-list/select-list.component";
import { ProgresBarComponent } from "../../shared/components/progres-bar/progres-bar.component";
import { DooughnutChartComponent } from "../../shared/components/dooughnut-chart/dooughnut-chart.component";


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
    BannerContentComponent,
    SelectListComponent,
    ProgresBarComponent,
    DooughnutChartComponent
],
})
export class HomePage implements OnInit{
  selectedButtonIndex: number = 1;
  selectedValue: string = 'Cartones';
  max:number = 100
  current:number = 40
  percentaje1: number = 80;
  percentaje2: number = 29;
  percentaje3: number = 46;
  percentaje4: number = 10;

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

  onSelectionChange(value: string): void {
    this.selectedValue = value; 
    console.log('Valor seleccionado:', this.selectedValue); 
  }

}
