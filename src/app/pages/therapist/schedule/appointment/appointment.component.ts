import { Component, Input, OnInit } from '@angular/core';
import { Appointment, appointments } from '../../../../api/interfaces/appointment';


@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit{

  selectedAppointment: Appointment = appointments[0];
  static appointment: Appointment[] = appointments;
  @Input() showAppointment!: Appointment;



  ngOnInit(): void {

    AppointmentComponent.appointment = appointments;
  }


}
