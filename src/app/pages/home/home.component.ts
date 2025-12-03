import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  user$!: boolean;
  profileId!: any;

  constructor(public authService: AuthService, private router: Router) {
    this.user$ = authService.isLoggedCheck();
  }

  ngOnInit(): void {
    this.profileId = this.authService.currentUser?.profile_id;
  }

}
