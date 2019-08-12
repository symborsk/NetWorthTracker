import { TestBed } from '@angular/core/testing';

import { NetWorthInfoService } from './net-worth-info.service';

describe('NetWorthInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetWorthInfoService = TestBed.get(NetWorthInfoService);
    expect(service).toBeTruthy();
  });
});
