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
    this.authService.user$.subscribe({
      next: (res) => {
        this.profileId = res?.profile_id;
      },
      error: (error) => {
        console.error('Error loading user:', error);
      }
    });
  }

}
