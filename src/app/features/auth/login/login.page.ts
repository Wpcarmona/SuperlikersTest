import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCheckbox } from '@ionic/angular/standalone';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { Router } from '@angular/router';
import { LoginResponse, SignupInfoResponse } from 'src/app/models/login.model';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { ButtonPrimaryComponent } from "../../../shared/components/btn/button-primary/button-primary.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoaderComponent, ButtonPrimaryComponent]
})
export class LoginPage implements OnInit{

  isPasswordVisible: boolean = false;
  username: string= '' ;
  password: string = '';
  isLoading= false;

  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.callInfoLogin()
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get isPasswordValid(): boolean {
    return this.password.length >= 6;
  }

  get isFormValid(): boolean {
    return this.isPasswordValid;
  }


  callInfoLogin(){
    this.loginService.signupInfo().subscribe({
      next: (response: SignupInfoResponse) => {
        console.log('Respuesta del servicio signupInfo:', response);
      },
      error: (error) => {
        console.error('Error al llamar el servicio signupInfo:', error);
      }
    });
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
