import { Injectable } from '@angular/core';
import * as LDClient from 'launchdarkly-js-client-sdk';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarklyService {
  private ldclient!: LDClient.LDClient;
  private flagValueSubject = new BehaviorSubject<boolean>(false); 

  flagValue$ = this.flagValueSubject.asObservable();

  constructor() {
    this.initializeLaunchDarkly();
  }

  // Inicializa LaunchDarkly
  private initializeLaunchDarkly(): void {
    const clientSideID = '670e6e4e20cafb08302604de'; 
    const flagKey = 'DummyService';  
    const context = {
      kind: 'user',
      key: 'wpcarmona-key', 
      name: 'wpcarmona'  
    };

    this.ldclient = LDClient.initialize(clientSideID, context);

    this.ldclient.on('ready', () => {
      const flagValue = this.ldclient.variation(flagKey, false);
      this.flagValueSubject.next(flagValue);
    });

    this.ldclient.on('change', (newFlagValue) => {
      this.flagValueSubject.next(newFlagValue);
    });
  }

  getFlagValue(): boolean {
    return this.flagValueSubject.getValue();
  }
}
