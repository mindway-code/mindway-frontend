import { TestBed } from '@angular/core/testing';

import { TherapistChildrenService } from './therapist-children.service';

describe('TherapistChildrenService', () => {
  let service: TherapistChildrenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapistChildrenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
