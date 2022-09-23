import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  headers = new HttpHeaders({
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjYzOTAzNTQ5LCJleHAiOjE2NjM5MTA3NDl9.XCtDu4s_0LcM2uXCLbZ-izLviTdoyzGQY0SpfWZcPLo'
  });
  url = '/customer';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.url, { headers: this.headers })
  }

}
