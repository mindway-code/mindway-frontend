import { TestBed } from '@angular/core/testing';

import { TherapistFamiliesService } from './therapist-families.service';

describe('TherapistFamiliesService', () => {
  let service: TherapistFamiliesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapistFamiliesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
