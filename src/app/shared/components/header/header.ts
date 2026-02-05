import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports:[RouterOutlet, MatToolbarModule, MatButtonModule],

  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  navigateToHomePage(): void {
    this.router.navigate(['/']);
  }

  constructor(private router: Router) {}
}
