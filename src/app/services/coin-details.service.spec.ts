import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoinDetails } from '../models/coinDetails';

import { CoinDetailsService } from './coin-details.service';

describe('CoinsService', () => {
  let service: CoinDetailsService;
  let httpMock: HttpTestingController;

  const ROOTurl = 'https://api.coingecko.com/api/v3';
  const coinId = '01coin';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoinDetailsService]
    });
    service = TestBed.inject(CoinDetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should retrieve coin details from the api via GET', () => {
    service.getCoinDetails(coinId).subscribe((coin: CoinDetails) => {
      expect(coin).toBeTruthy(2);
    });

    const request = httpMock.expectOne(`${ROOTurl}/coins/${coinId}`);
    expect(request.request.method).toBe('GET');

  });
});
