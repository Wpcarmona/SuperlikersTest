import { TestBed } from '@angular/core/testing';
import { KpiService } from './kpi.service';
import { of, throwError } from 'rxjs';
import axios from 'axios';
import { DUMMY_ENTRIES_RESPONSE } from 'src/utils/dummys/entries.dummy';
import { EntriesResponse } from 'src/app/models/entries.model';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('KpiService', () => {
  let service: KpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KpiService],
    });
    service = TestBed.inject(KpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return dummy entries response when isDummy is true', async () => {
    const result = await (await service.getEntries('123', true)).toPromise();
    expect(result).toEqual(DUMMY_ENTRIES_RESPONSE);
  });

  it('should perform real request and return entries response', async () => {
    const mockResponse: EntriesResponse = {
      data: {
        previous_page_token: 123,
        next_page_token: 456,
        entries: [
          {
            name: 'Test Entry',
            meta_mes: 100,
            avance_actual: 50,
            activity_count: 0,
            category: '',
            created_at: '',
            moderation: '',
            points: 0,
            state: '',
            id: '',
            slug: '',
            participant: undefined,
            as_form: false,
            data: undefined
          },
        ],
      },
      ok: ''
    }

    mockedAxios.post.mockResolvedValue({ data: mockResponse });

    const result = await (await service.getEntries('123', false)).toPromise();
    expect(result).toEqual(mockResponse);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${service['apiUrl']}`,
      // expect.any(), 
      // expect.objectContaining({
      //   headers: { 'Content-Type': 'application/json' },
      // })
    );
  });

  it('should handle error from server response', async () => {
    const mockError = {
      response: {
        data: {
          message: 'Error fetching entries',
        },
      },
    };

    mockedAxios.post.mockRejectedValue(mockError);

    try {
      await (await service.getEntries('123', false)).toPromise();
    } catch (error) {
      expect(error).toEqual(mockError.response.data);
    }
  });
});
