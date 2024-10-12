import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/utils/device-identifier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:true,
  imports:[CommonModule]
})
export class HeaderComponent implements OnInit {
  headerClass: string = 'profile-header';

  constructor(private deviceService: DeviceService) {}

  async ngOnInit() {
    const deviceType = await this.deviceService.checkDeviceType();
    if (deviceType == "iosnotch") {
      this.headerClass = 'profile-header-notch';
    }
  }

  
}
