import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistUserComponent } from './therapist-user.component';

describe('TherapistUserComponent', () => {
  let component: TherapistUserComponent;
  let fixture: ComponentFixture<TherapistUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapistUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TherapistUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
