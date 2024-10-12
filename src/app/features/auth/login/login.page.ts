import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage {

  isPasswordVisible: boolean = false;
  username: string= '' ;
  password: string = '';

  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get isPasswordValid(): boolean {
    return this.password.length >= 6;
  }

  get isFormValid(): boolean {
    return this.isPasswordValid;
  }

  login() {
    this.loginService.login(this.username, this.password)
      .then(response => {
        console.log('Respuesta del servicio:', response);
        this.router.navigate(['home'])
        // Aquí puedes manejar la respuesta, como guardar el token
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje al usuario
      });
  }
}
