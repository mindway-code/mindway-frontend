import { Component, OnInit } from '@angular/core';
import { AppointmentComponent } from './appointment/appointment.component';
import { Router } from '@angular/router';
import { Appointment, AppointmentsGrouped } from '../../../api/interfaces/appointment';
import { last } from 'rxjs';


@Component({
  selector: 'app-schedule',
  standalone: false,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public appointments: Appointment[] = AppointmentComponent.appointment;
  daysOfMonth: { [date: string]: Appointment[] } = {};
  aptGroups: { [date: string]: Appointment[] } = {}; // Obj onde cada chave "date" é uma string YYYY-MM-DD e o valor é um array de Appt[]
  showMonth: any;
  showMonthName: any;
  weekGroup: { [weekIndex: number]: { [date: string]: Appointment[] } } = {};
  //cada semana é um objeto onde a chave é uma data e o valor é um array de Appt[]
  monthName: any = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  weekValue: any = [ ];
  selectedWeek: number  = 0;

  appointmentsGrouped: AppointmentsGrouped = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.groupAppointments();

    //console.log(this.appointmentsGrouped);
    const d = new Date();
    this.showMonth = d.getMonth();
    console.log(this.showMonth);
    this.selectedWeek = 0;
    this.generateWeek(this.appointmentsGrouped , 0, d, d);


    this.showMonthName = this.monthName[this.showMonth];
    //console.log(this.weekGroup);
  }

  setMonth(event: any) {

    this.weekGroup = {};
    this.daysOfMonth = {};
    this.weekValue = [];

    const d = new Date();
    let year = d.getFullYear();

    const showMonth = this.monthName.indexOf(event.target.value);
    console.log(showMonth);

    const month = new Date(year, showMonth, 1);

    this.showMonth = month.getMonth();

    console.log(this.showMonth)
    const day = new Date(year, showMonth, 1);

    this.selectedWeek = Number(0);

    this.generateWeek(this.appointmentsGrouped , this.selectedWeek, month, day); // appt, index, month, day

    const index = this.monthName.indexOf(event.target.value);
    this.showMonthName = this.monthName[index];

    console.log(this.showMonthName);
  }

  setWeek(event: any) {
    this.weekGroup = {};
    this.daysOfMonth = {};
    this.weekValue = [];

    const d = new Date();
    this.selectedWeek = Number(event.target.value);

    let year = d.getFullYear();

    const day = new Date(year, this.showMonth, 1);
    //console.log(day);
    //console.log(this.selectedWeek);
    this.generateWeek(this.appointmentsGrouped , this.selectedWeek, day, day);

  }

  generateWeek(
    apptGrouped: AppointmentsGrouped,
    index: number,
    monthNumber: Date,
    today: Date
   ) {

    let year = today.getFullYear();
    let month = monthNumber.getMonth();
    let dia = today.getDate();

    console.log(month, dia)

    const firstDay = new Date(year, month, 1 );
    const lastDay = new Date(year, month + 1, 0);

    for(let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const formattedDate = date.toISOString().split('T')[0];
      this.daysOfMonth[formattedDate] = [];
    }

    this.weekGroup = {};

    for(let i = 0; i < Object.keys(this.daysOfMonth).length; i++) {

      const weekIndex = Math.floor(i/7);


      if(!this.weekGroup[weekIndex]) {
        this.weekGroup[weekIndex] = {};
        this.weekValue.push(weekIndex);
      }

      const date = Object.keys(this.daysOfMonth)[i];

      this.aptGroups[date] = apptGrouped[year]?.[String(month + 1).padStart(2, '0')]?.[String(index + 1)]?.[String(date)] || [];

      this.weekGroup[weekIndex][date] = this.aptGroups[date];
    }

    return this.weekGroup;

  }


  viewDetails(id: number) {
    this.router.navigate(['/therapist/schedule', id]);
  }

  groupAppointments() {
    this.appointmentsGrouped = this.appointments.reduce((group, appointment) => {
      const year = appointment.date.split('-')[0];
      const month = appointment.date.split('-')[1];
      const day = appointment.date.split('T')[0];

      // Converte a data para um objeto Date
      const d = new Date(appointment.date + 'T00:00:00');
      const week = Math.floor((d.getDate() - 1) / 7) + 1;

      if (!group[year]) {
        group[year] = {};
      }

      if (!group[year][month]) {
        group[year][month] = {};
      }

      if (!group[year][month][week]) {
        group[year][month][week] = {};
      }

      if (!group[year][month][week][day]) {
        group[year][month][week][day] = [];
      }

      // Adiciona o agendamento ao grupo
      group[year][month][week][day].push(appointment);

      return group;
    }, {} as AppointmentsGrouped);

  }

}
