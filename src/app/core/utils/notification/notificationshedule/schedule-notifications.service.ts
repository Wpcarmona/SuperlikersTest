import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class ScheduleNotificationsService {

  constructor() { }


  async initializeNotifications() {
    const { display } = await LocalNotifications.requestPermissions();
    if (display === 'granted') {
      console.log('Permission granted for notifications');
      this.scheduleNotification();
    } else {
      console.log('Permission denied for notifications');
    }
  }

  async scheduleNotification() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Prueba",
          body: "Esta es una notificación de prueba",
          id: 122222222, 
          schedule: { at: new Date(Date.now() + 1000 * 5) }, 
          sound: "default",
          actionTypeId: "",
          extra: null,
        },
      ],
    });

    console.log("Notificación programada");
  }


}
