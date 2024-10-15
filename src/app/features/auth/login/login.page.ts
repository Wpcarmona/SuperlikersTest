import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/login.model';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { ButtonPrimaryComponent } from '../../../shared/components/btn/button-primary/button-primary.component';
import { ChechboxComponent } from '../../../shared/components/chechbox/chechbox.component';
import { AlertCardViewComponent } from '../../../shared/components/alert-card-view/alert-card-view.component';
import { DarklyService } from 'src/app/core/services/featureflag/darklyflag.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    LoaderComponent,
    ButtonPrimaryComponent,
    ChechboxComponent,
    AlertCardViewComponent,
  ],
})
export class LoginPage {
  isPasswordVisible: boolean = false;
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  showErroCard: boolean = false;
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private featureFlag: DarklyService
  ) {}

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
    this.isLoading = true;
    const featureFlag = this.featureFlag.getFlagValue();
    this.loginService
      .login(this.username, this.password, featureFlag)
      .subscribe({
        next: (response: LoginResponse) => {
          if (response.ok === 'true') {
            localStorage.setItem('token', response.token);
            localStorage.setItem('distinct_id', this.username);
            localStorage.setItem('isLogged', 'true');
            this.username = '';
            this.password = '';
            this.isLoading = false;
            this.router.navigate(['home'],{ replaceUrl: true });
          } else {
            this.isLoading = false;
            this.showErroCard = true;
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.isLoading = false;
          this.showErroCard = true;
          this.errorMessage =
            error.message === 'Network Error'
              ? 'Lo sentimos, tenemos inconvenientes. Trata en otro momento.'
              : error.message;
        },
      });
  }

  closeCard() {
    this.showErroCard = false;
  }
}
