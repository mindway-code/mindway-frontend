import { TestBed } from '@angular/core/testing';

import { TherapistUserService } from './therapist-user.service';

describe('TherapistUserService', () => {
  let service: TherapistUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapistUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
