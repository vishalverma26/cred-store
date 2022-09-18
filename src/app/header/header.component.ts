import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authenticateSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authenticateSvc.userSubject.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  logout() {
    this.authenticateSvc.signout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
