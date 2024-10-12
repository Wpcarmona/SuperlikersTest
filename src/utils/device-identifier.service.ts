import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {


  private notchModels: string[] = [
    'iPhone X', 'iPhone XR', 'iPhone XS', 'iPhone XS Max', 
    'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max', 
    'iPhone 12', 'iPhone 12 mini', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
    'iPhone 13', 'iPhone 13 mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
    'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
    'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
    'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max'
  ];

  constructor() { }


  async getDeviceInfo() {
    const info = await Device.getInfo();
    return info;
  }

  async isIOS() {
    const info = await this.getDeviceInfo();
    return info.operatingSystem === 'ios';
  }

  async hasNotch() {
    const info = await this.getDeviceInfo();

    if (info.operatingSystem !== 'ios') {
      return false;
    }

    return this.notchModels.includes(info.model);
  }

  async checkDeviceType(): Promise<string> {
    const info = await this.getDeviceInfo();

    if (info.operatingSystem === 'android') {
      return 'android';
    } else if (info.operatingSystem === 'ios') {
      const hasNotch = this.notchModels.includes(info.model);
      return hasNotch ? 'iosnotch' : 'ios';
    }

    return 'unknown'; 
  }
}
