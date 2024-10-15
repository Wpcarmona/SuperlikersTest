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
import { DarklyService } from 'src/app/core/services/featureflag/darklyflag.service';
import { AlertCardViewComponent } from "../../shared/components/alert-card-view/alert-card-view.component";
import { LoginUtilsService } from 'src/app/core/utils/auth/auth.service';
import { SkeletonChartsComponent } from "../../shared/components/skeleton-charts/skeleton-charts.component";

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
    AlertCardViewComponent,
    SkeletonChartsComponent
],
})
export class HomePage implements OnInit {
  selectedButtonIndex: number = 1;
  selectedValue: string = 'Cartones';
  entriesCartones: NewEntry[] = [];
  entriesHectolitros: NewEntry[] = [];
  progressBarMax: number = 100;
  progressBarCurrent: number = 0;
  isLoading: boolean = false;
  colors: string[] = ['#385cad', '#b1fdf3', '#ff8485', '#ff9015'];
  color: string = '#385cad';
  showErroCard: boolean = false;
  errorMessage: string = '';
  showProgress:boolean = false;
  showChart:boolean = false

  constructor(
    private localNotification: ScheduleNotificationsService,
    private pushNotification: PushNotificationService,
    private deviceService: DeviceService,
    private modelKpiService: KpiModelService,
    private featureFlag: DarklyService,
    private authUtilService: LoginUtilsService
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
      this.showChart = true;
      const featureFlag = this.featureFlag.getFlagValue()
      const resultado = await this.modelKpiService.consumePrintProcessedData(
        '12222222',
        featureFlag
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

      this.showProgress = false
      this.showChart = false;
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
      this.showProgress = true;
      
    } catch (error) {
      this.isLoading = false;
      this.isLoading = false;
      this.showErroCard = true;
      if (error instanceof Error) {
        this.errorMessage =
          error.message === 'Network Error'
            ? 'Lo sentimos, tenemos inconvenientes. Trata en otro momento.'
            : error.message;
      } else {
        this.errorMessage = 'Lo sentimos, tenemos inconvenientes. Intenta en otro momento.';
      }
      console.log('Errorpp:', error);
    }
  }

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  closeCard() {
    this.showErroCard = false;
    this.authUtilService.logoutNavigate()
  }
}
