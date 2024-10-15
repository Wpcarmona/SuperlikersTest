import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { Observable, of, throwError } from 'rxjs';
import { EntriesRequest, EntriesResponse } from 'src/app/models/entries.model';
import { DUMMY_ENTRIES_RESPONSE } from 'src/utils/dummys/entries.dummy';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KpiService {
  private readonly apiUrl = `${environment.BASE_URL_ONRAIL}/api/entries/entries`;

  constructor() {}

  async getEntries(
    distinct_id: string,
    isDummy: boolean = false,
  ): Promise<Observable<EntriesResponse>> {
    if (isDummy) {
      return of(DUMMY_ENTRIES_RESPONSE);
    }

    const requestData: EntriesRequest = {
      api_key: environment.API_KEY,
      campaign: '4u',
      date_filter: {
        sdate: "2024-08-01",
        edate: "2024-08-31"
      },
      distinct_id: distinct_id,
      _type: 'External',
      atype: 'avance_metas'
    };

    return new Observable<EntriesResponse>((observer) => {
      axios.post<EntriesResponse>(this.apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error: AxiosError) => {
        console.error('Error fetching entries:', error);
        observer.error(error.response ? error.response.data : error);
      });
    });
  }
}
