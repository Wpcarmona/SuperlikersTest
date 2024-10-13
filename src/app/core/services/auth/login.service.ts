import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse, SignupInfoResponse } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = `${environment.BASE_URL}/v1/microsite/sessions`;
  private readonly infoUrl = `${environment.BASE_URL}/v1/forms/signup/info?`;
  public isLogged = false
  

  constructor(private http: HttpClient) {}


  login(codigoCliente: string, password: string): Observable<LoginResponse> {
    const data = {
      campaign: '4u',
      participation: {
        'codigo-de-cliente': codigoCliente,
        password: password,
      },
    };

    const headers = new HttpHeaders({
      'Authorization': 'Bearer fe7f60bab39cd8b46cc414d28adf7fff',
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(this.apiUrl, data, { headers });
  }

  islogged():boolean{
    this.isLogged = true
    return true
  }

  logout():boolean{
    localStorage.clear();
    this.isLogged = false
    return false
  }

  signupInfo(): Observable<SignupInfoResponse> {
    const data = {
      api_key: 'fe7f60bab39cd8b46cc414d28adf7fff',
      campaign: '4u'
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<SignupInfoResponse>(this.infoUrl, data, { headers });
  }
}
