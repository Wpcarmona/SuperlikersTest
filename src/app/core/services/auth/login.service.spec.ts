import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { DUMMY_LOGIN_ERROR_RESPONSE, DUMMY_LOGIN_RESPONSE } from 'src/utils/dummys/auth.dummy';
import axios from 'axios';
import { LoginResponse } from 'src/app/models/login.model';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return dummy login response when isDummy is true', (done) => {
    service.login('123', 'password', true).subscribe(response => {
      expect(response).toEqual(DUMMY_LOGIN_RESPONSE);
      done();
    });
  });

  it('should return dummy error response when isDummy and simulateError are true', (done) => {
    service.login('123', 'password', true, true).subscribe({
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.error).toEqual(DUMMY_LOGIN_ERROR_RESPONSE);
        done();
      }
    });
  });

  it('should perform real login request and return response', (done) => {
    const mockResponse: LoginResponse = {
      token: '12345',
      ok: 'true',
      message:'prueba exitosa'
    };

    mockedAxios.post.mockResolvedValue({ data: mockResponse });

    service.login('12222222', '123456789').subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(service['apiUrl'], {
      campaign: '4u',
      participation: {
        'codigo-de-cliente': '123',
        password: 'password',
      },
    });
  });

  it('should handle an error response from the server', (done) => {
    const mockError = { response: { data: { message: 'Invalid credentials' } } };
    mockedAxios.post.mockRejectedValue(mockError);

    service.login('123', 'wrong-password').subscribe({
      error: (error) => {
        expect(error).toEqual(mockError.response.data);
        done();
      }
    });
  });
});
