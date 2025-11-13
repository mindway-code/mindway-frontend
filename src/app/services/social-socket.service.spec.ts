import { TestBed } from '@angular/core/testing';

import { SocialSocketService } from './social-socket.service';

describe('SocialSocketService', () => {
  let service: SocialSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
