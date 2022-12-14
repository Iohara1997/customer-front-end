import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = '/customer';

  constructor(private http: HttpClient, private router: Router) { }

  getCustomers(): Observable<any> {
    return this.http.get(this.url).pipe(
      tap({
        next: (res) => {
          this.router.navigate(['']);
        },
        error: (err) => {
          if (err.error == 'Invalid Token.') {
            localStorage.clear()
            return this.router.navigate(['login']);
          }
        }
      })
    );
  }

  async getOneCustomer(id: string) {
    try {
      return await this.http.get(this.url + '/' + id)
    } catch (error) {
      console.log(error)
    }
  }

  createCustomer(customer: any): Observable<any> {
    const name = customer.name;
    const email = customer.email;
    const cpf = customer.cpf;
    const phone = customer.phone;
    const address = customer.street + ', ' + customer.num;
    const cep = customer.cep;
    return this.http.post<any>(this.url, { email, name, cpf, phone, address, cep }).pipe(
      tap({
        next: (res) => {
          this.router.navigate(['']);
        },
        error: (err) => {
          if (err.error == 'Invalid Token.') {
            localStorage.clear()
            return this.router.navigate(['login']);
          }
        }
      })
    )
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe(
      tap({
        next: (res) => {
          this.router.navigate(['']);
        },
        error: (err) => {
          if (err.error == 'Invalid Token.') {
            localStorage.clear()
            return this.router.navigate(['login']);
          }
        }
      })
    );
  }

  updateCustomer(id: string, customer: any): Observable<any> {
    const name = customer.name;
    const email = customer.email;
    const cpf = customer.cpf;
    const phone = customer.phone;
    const address = customer.street + ', ' + customer.num;
    const cep = customer.cep;
    return this.http.put(this.url + '/' + id, { email, name, cpf, phone, address, cep }).pipe(
      tap({
        next: (res) => {
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err)
          if (err.error == 'Invalid Token.') {
            localStorage.clear()
            return this.router.navigate(['login']);
          }
        }
      })
    );
  }
}
