import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse, SignupInfoResponse } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { DUMMY_LOGIN_ERROR_RESPONSE, DUMMY_LOGIN_RESPONSE } from 'src/utils/dummys/auth.dummy';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = `${environment.BASE_URL}/v1/microsite/sessions`;
  private readonly infoUrl = `${environment.BASE_URL}/v1/forms/signup/info?`;
  
  

  constructor(private http: HttpClient) {}


  login(codigoCliente: string, password: string, isDummy: boolean = false, simulateError: boolean = false): Observable<LoginResponse> {
    if (isDummy) {
        if (simulateError) {
            
            return throwError(() => ({ status: 404, error: DUMMY_LOGIN_ERROR_RESPONSE }));
        }
        
        return of(DUMMY_LOGIN_RESPONSE);
    }
    const data = {
      campaign: '4u',
      participation: {
        'codigo-de-cliente': codigoCliente,
        password: password,
      },
    };

    return this.http.post<LoginResponse>(this.apiUrl, data);
}

  logout():void{
    localStorage.clear();
  }

}
