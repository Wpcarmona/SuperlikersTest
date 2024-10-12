import { Injectable } from '@angular/core';
import { ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token, } from '@capacitor/push-notifications';


@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor() {
    this.initializePushNotificationsDoc();
   }
   
  initializePushNotificationsDoc() {
    console.log('Initializing Push Notifications');

    // Solicitar permisos para notificaciones push
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Registrar el dispositivo para recibir notificaciones
        PushNotifications.register();
      } else {
        // Mostrar error si no se concedieron los permisos
        // alert('Push notification permissions not granted');
      }
    });

    // Registro exitoso: obtenemos el token
    PushNotifications.addListener('registration', (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
      console.log('Push registration success, token:', token.value);
    });

    // Manejo de errores durante el registro
    PushNotifications.addListener('registrationError', (error: any) => {
      // alert('Error on registration: ' + JSON.stringify(error));
      console.error('Error on registration:', error);
    });

    // Recibir notificación cuando la app está abierta
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      // alert('Push received: ' + JSON.stringify(notification));
      console.log('Push received:', notification);
    });

    // Acciones cuando el usuario interactúa con la notificación
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      // alert('Push action performed: ' + JSON.stringify(notification));
      console.log('Push action performed:', notification);
    });
  }
}
