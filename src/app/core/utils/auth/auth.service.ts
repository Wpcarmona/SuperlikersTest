import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginUtilsService {
  

  constructor(
    private router:Router
  ) {}

  logoutNavigate(): void {
    localStorage.clear();
    this.router.navigate(['login'],{ replaceUrl: true })
  }
}
