import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { notchModels } from './deviceNotchModel';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

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

    return notchModels.includes(info.model);
  }

  async checkDeviceType(): Promise<string> {
    const info = await this.getDeviceInfo();

    if (info.operatingSystem === 'android') {
      return 'android';
    } else if (info.operatingSystem === 'ios') {
      const hasNotch = notchModels.includes(info.model);
      return hasNotch ? 'iosnotch' : 'ios';
    }
    return 'unknown'; 
  }
}
