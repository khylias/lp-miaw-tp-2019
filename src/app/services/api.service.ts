import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Joueur } from './../models';

import { of, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(filterPoste?, filterFirstName?, page?, limit?): Observable<Joueur[]> {
    const httpParams = {};

    if (filterPoste) {
      httpParams['poste'] = filterPoste;
    }

    if (filterFirstName) {
      httpParams['firstName'] = filterFirstName;
    }

    if (page) {
      httpParams['_page'] = page;
    }

    if (limit) {
      httpParams['_limit'] = limit;
    }

    const options = {
      params: httpParams
    };

    return this.http.get<Joueur[]>('http://localhost:3000/joueurs', options);
  }

  addPlayer(data): Observable<any> {
    return this.http.post('http://localhost:3000/joueurs', data);
  }

  updatePlayer(id, data): Observable<any> {
    return this.http.patch('http://localhost:3000/joueurs/' + id, data);
  }

  login(id: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/login', { email: id, password: password });
  }
}
