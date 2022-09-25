import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IUuser } from '../INTERFACES/IUuser';;

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: IUuser): Observable<any> {
    const email = user.email;
    const password = user.password;

    return this.httpClient.post<any>(apiUrl + "login", { email, password }).pipe(
      tap({
        next: (res) => {
          localStorage.setItem('token', btoa(JSON.stringify(res['token'])));
          localStorage.setItem('user', btoa(JSON.stringify(res['user'])));
          this.router.navigate(['']);
        },
        error: (err) => err
      })
    )
  }

  register(user: IUuser): Observable<any> {
    const email = user.email;
    const password = user.password;
    const name = user.name;

    return this.httpClient.post<any>(apiUrl + "register", { email, password, name }).pipe(
      tap({
        next: (res) => {
          localStorage.setItem('token', btoa(JSON.stringify(res['token'])));
          localStorage.setItem('user', btoa(JSON.stringify(res['user'])));
          this.router.navigate(['']);
        },
        error: (err) => err
      })
    )
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  get loggedUser(): IUuser {
    const result = localStorage.getItem('user');

    return result
      ? JSON.parse(atob(result))
      : null;
  }
  get loggedIdUser() {
    const result = localStorage.getItem('user');
    if (!result) return null;

    const user = JSON.parse(atob(result)) as IUuser;
    return user.id_user;
  }
  get getTokenUser(): string {
    const result = localStorage.getItem('token')
    return result
      ? JSON.parse(atob(result))
      : null;
  }
  get logged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
