import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistProfileComponent } from './therapist-profile.component';

describe('TherapistProfileComponent', () => {
  let component: TherapistProfileComponent;
  let fixture: ComponentFixture<TherapistProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapistProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TherapistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
