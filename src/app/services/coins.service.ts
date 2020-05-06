import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { map, filter } from 'rxjs/operators';
import { Coin } from '../models/coin';
import { CoinsHolder } from '../models/coinsHolder';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  constructor(private http: HttpClient) {}

  init() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<any>(
      'https://api.coingecko.com/api/v3/coins/list',
      httpOptions
    );
  }
  getCoins(): Observable<CoinsHolder> {
    return this.init().pipe(
      map(result => {
        const coins = result.map(coin => new Coin(coin));
        return new CoinsHolder(coins);
      })
    );
  }
}
