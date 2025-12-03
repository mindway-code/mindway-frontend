import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistTaskComponent } from './therapist-task.component';

describe('TherapistTaskComponent', () => {
  let component: TherapistTaskComponent;
  let fixture: ComponentFixture<TherapistTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapistTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TherapistTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
