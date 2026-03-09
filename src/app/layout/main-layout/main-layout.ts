import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../features/auth/services/auth';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  charactersCount: number = 0;

  get user() {
    return this.authService.getUser();
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    // Aquí podría obtener el count de characters desde un servicio
    // Por ahora lo dejamos como placeholder
    this.charactersCount = 0;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/register']);
  }

  goToProfile(): void {
    this.router.navigate(['/auth/profile']);
  }
}
