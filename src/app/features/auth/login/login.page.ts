import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCheckbox } from '@ionic/angular/standalone';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/login.model';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoaderComponent]
})
export class LoginPage {

  isPasswordVisible: boolean = false;
  username: string= '' ;
  password: string = '';
  isLoading= false;

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
    this.isLoading = true
    this.loginService.login(this.username, this.password).subscribe(
      (response: LoginResponse) => {
        console.log('Login exitoso:', response);
        this.isLoading = false
        this.router.navigate(['home'])
        // manejar el éxito, por ejemplo, almacenar el token
      },
      (error) => {
        console.error('Error en el login:', error);
        this.isLoading = false
        this.router.navigate(['home'])
        // manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
}
