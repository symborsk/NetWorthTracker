import { TestBed } from '@angular/core/testing';

import { CurrencyFetcherService } from './currency-fetcher.service';

describe('CurrencyFetcherServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyFetcherService = TestBed.get(CurrencyFetcherService);
    expect(service).toBeTruthy();
  });
});
