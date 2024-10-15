import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { FooterTabComponent } from 'src/app/shared/components/footer-tab/footer-tab.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TabsContentComponent } from 'src/app/shared/components/tabs-content/tabs-content.component';
import { BannerContentComponent } from '../../shared/components/banner-content/banner-content.component';
import { ScheduleNotificationsService } from 'src/app/core/utils/notification/notificationshedule/schedule-notifications.service';
import { PushNotificationService } from 'src/app/core/utils/notification/pushNotification/push-notification.service';
import { DeviceService } from 'src/utils/device-identifier.service';
import { SelectListComponent } from '../../shared/components/select-list/select-list.component';
import { ProgresBarComponent } from '../../shared/components/progres-bar/progres-bar.component';
import { DooughnutChartComponent } from '../../shared/components/dooughnut-chart/dooughnut-chart.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { KpiModelService } from 'src/app/core/models/kpi/kpi.models';
import { NewEntry } from 'src/app/models/entries.model';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

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
    DooughnutChartComponent,
    LoaderComponent,
    SkeletonComponent,
  ],
})
export class HomePage implements OnInit {
  selectedButtonIndex: number = 1;
  selectedValue: string = 'Cartones';
  entriesCartones: NewEntry[] = [];
  entriesHectolitros: NewEntry[] = [];
  progressBarMax: number = 100;
  progressBarCurrent: number = 10;
  isLoading: boolean = false;
  colors: string[] = ['#385cad', '#b1fdf3', '#ff8485', '#ff9015'];
  color: string = '#385cad';

  constructor(
    private localNotification: ScheduleNotificationsService,
    private pushNotification: PushNotificationService,
    private deviceService: DeviceService,
    private modelKpiService: KpiModelService
  ) {}

  async ngOnInit() {
    this.fetchEntries();
    const isIOS = await this.deviceService.isIOS();
    if (isIOS) {
      this.localNotification.initializeNotifications();
    } else {
      this.pushNotification.initializePushNotificationsDoc();
    }
  }

  onSelectionChange(value: string): void {
    this.selectedValue = value;
  }

  async fetchEntries() {
    try {
      this.isLoading = true;
      const resultado = await this.modelKpiService.consumePrintProcessedData(
        '12222222',
        true
      );
      //  console.log('Resultado final:', resultado);
      this.entriesCartones = resultado.data.cartones.map((item) => ({
        name: item.name,
        avance: Number(item['avance']) || 0,
        meta: Number(item['meta']) || 0,
      }));
      this.entriesHectolitros = resultado.data.hectolitros.map((item) => ({
        name: item.name,
        avance: Number(item['avance']) || 0,
        meta: Number(item['meta']) || 0,
      }));

      this.progressBarMax = 0;
      this.progressBarCurrent = 0;

      this.entriesCartones.forEach((item) => {
        this.progressBarMax += item.meta;
        this.progressBarCurrent += item.avance;
      });

      this.entriesHectolitros.forEach((item) => {
        this.progressBarMax += item.meta;
        this.progressBarCurrent += item.avance;
      });
      this.isLoading = false;
    } catch (error) {
      console.error('Error al consumir los datos:', error);
    }
  }

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
}
