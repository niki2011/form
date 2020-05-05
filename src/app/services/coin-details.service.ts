import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CoinDetails } from '../models/coinDetails';

@Injectable({
  providedIn: 'root'
})
export class CoinDetailsService {

  constructor(
    private http: HttpClient,
  ) { }

  handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      console.log(error);
    }

    // return an observable with a user-facing error message
    return throwError(new Error('Something bad happened; please try again later.'));
  }

  init(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<any>(
      'https://api.coingecko.com/api/v3/coins/' + id,
      httpOptions
    );
  }

  getCoinDetails(id): Observable<CoinDetails> {
    return this.init(id).pipe(
      map(result => {
        return new CoinDetails(result);
      })
    );
  }

  submitFormFaultReport(coin: CoinDetails): Observable<any> {

    const endpoint = 'https://api.coingecko.com/api/v3/coins/' + coin.id;

    // this.logService.log('Called endpoint for submitFormFaultReport():', endpoint);

    return this.http.post(endpoint, coin, {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }
}
