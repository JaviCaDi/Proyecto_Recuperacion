import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = '';
  contrasena: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.nombre, this.contrasena).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        localStorage.setItem('username', this.nombre); // guarda el nombre del usuario
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
      }
    });

  }
}
