import { Component, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-children',
  standalone: false,
  templateUrl: './children.component.html',
  styleUrl: './children.component.scss'
})
export class ChildrenComponent implements OnInit{
  showProgress = false;
  user$!: boolean;
  userName!: string;

  constructor(public authService: AuthService, private router: Router) {
    this.user$ = authService.isLoggedCheck();
  }
  ngOnInit(): void {
    this.userName = this.authService.currentUser?.name || 'Usuário';
  }

  openProgress() {
    this.showProgress = true;
  }


}
