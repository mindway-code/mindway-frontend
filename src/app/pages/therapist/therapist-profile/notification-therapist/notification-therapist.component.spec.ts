import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTherapistComponent } from './notification-therapist.component';

describe('NotificationTherapistComponent', () => {
  let component: NotificationTherapistComponent;
  let fixture: ComponentFixture<NotificationTherapistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationTherapistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationTherapistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
