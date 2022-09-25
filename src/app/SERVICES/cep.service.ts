import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CepService {


  constructor(private http: HttpClient, private router: Router) { }

  async getDataCep(cep) {
    try {
      return await this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
    } catch (error) {
      console.error(error)
    }
  }


}
