import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntriesRequest, EntriesResponse } from 'src/app/models/entries.model';
import { DUMMY_ENTRIES_RESPONSE } from 'src/utils/dummys/entries.dummy';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class KpiService {

  private readonly apiUrl = `${environment.BASE_URL}/v1/entries/index`;


  constructor(private http: HttpClient) {}

 
  getEntries(
    distinct_id: string,
    isDummy:boolean = false,
    dummyEmpty:boolean = false,
    dummyError:boolean = false
  ): Observable<EntriesResponse> {
    if (isDummy) {
    
      return of (DUMMY_ENTRIES_RESPONSE);
    }

    const requestData: EntriesRequest = {
      api_key: environment.API_KEY,
      campaign: 'u4',
      date_filter: {
        sdate: "2024-08-01",
        edate: "2024-08-31"
      },
      distinct_id: distinct_id,
      _type: 'External',
      atype: 'avance_metas'
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<EntriesResponse>(this.apiUrl, requestData, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching entries:', error);
        return throwError(() => error);
      })
    );
  }
}
