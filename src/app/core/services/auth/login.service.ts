import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { LoginResponse } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { DUMMY_LOGIN_ERROR_RESPONSE, DUMMY_LOGIN_RESPONSE } from 'src/utils/dummys/auth.dummy';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = `${environment.BASE_URL}/v1/microsite/sessions`;

  constructor() {}

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

    return new Observable<LoginResponse>((observer) => {
      axios.post<LoginResponse>(this.apiUrl, data)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError) => {
          observer.error(error.response ? error.response.data : error);
        });
    });
  }

  logout(): void {
    localStorage.clear();
  }
}
