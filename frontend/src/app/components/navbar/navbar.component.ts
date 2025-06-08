import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get username(): string {
    return this.authService.getUsername() || '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Asegura la redirección al cerrar sesión
  }

  eliminarCuenta() {
    if (confirm('¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible.')) {
      this.authService.eliminarCuenta().subscribe({
        next: () => {
          alert('Cuenta eliminada.');
          this.logout(); // También elimina el token y redirige
        },
        error: () => {
          alert('Cuenta eliminada.');
          this.logout();
        }
      });
    }
  }
}
