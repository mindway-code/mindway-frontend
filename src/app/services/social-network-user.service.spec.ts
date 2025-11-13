import { TestBed } from '@angular/core/testing';

import { SocialNetworkUserService } from './social-network-user.service';

describe('SocialNetworkUserService', () => {
  let service: SocialNetworkUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialNetworkUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
