import axios from 'axios';
import { Injectable } from '@angular/core';
import { LoginResponse } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = `${environment.BASE_URL}/v1/microsite/sessions`;

  constructor() { }

  login(codigoCliente: string, password: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      const data = {
        campaign: '4u',
        participation: {
          'codigo-de-cliente': codigoCliente,
          password: password,
        },
      };

      const headers = {
        'Authorization': 'Bearer fe7f60bab39cd8b46cc414d28adf7fff',
        'Content-Type': 'application/json' 
      };

      axios
        .post<LoginResponse>(this.apiUrl, data, { headers })
        .then((response) => {
          resolve(response.data); 
        })
        .catch((error) => {
          reject(error.response ? error.response.data : error.message); 
        });
    });
  }
}
