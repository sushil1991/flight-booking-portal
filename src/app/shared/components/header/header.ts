import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule],

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
