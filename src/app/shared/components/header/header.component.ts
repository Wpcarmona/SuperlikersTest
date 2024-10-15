import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/auth/login.service';
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

  @Input() name:string = ''
  @Input() code:string = ''

  constructor(
    private deviceService: DeviceService,
    private authServies: LoginService,
    private router:Router
  ) {}

  async ngOnInit() {
    const deviceType = await this.deviceService.checkDeviceType();
    if (deviceType == "iosnotch") {
      this.headerClass = 'profile-header-notch';
    }else if (deviceType == 'ios'){
      this.headerClass = 'profile-header-ios'
    }
  }

  logout(){
    this.authServies.logout()
    this.router.navigate(['login'])
  }

  
}
