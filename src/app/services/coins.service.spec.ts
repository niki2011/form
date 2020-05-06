import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoinsHolder } from '../models/coinsHolder';

import { CoinsService } from './coins.service';

describe('CoinsService', () => {
  let service: CoinsService;
  let httpMock: HttpTestingController;

  const ROOTurl = 'https://api.coingecko.com/api/v3';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoinsService]
    });
    service = TestBed.inject(CoinsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should retrieve coins frpm the api via GET', () => {
    service.getCoins().subscribe((coins: CoinsHolder) => {
      expect(coins.coinList.length).toBeGreaterThan(2);
    });

    const request = httpMock.expectOne(`${ROOTurl}/coins/list`);
    expect(request.request.method).toBe('GET');

  });
});
