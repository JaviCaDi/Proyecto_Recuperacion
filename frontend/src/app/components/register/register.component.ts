import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre: string = '';
  contrasena: string = '';
  rol: string = 'USUARIO';
  id_arbitro: number | null = null;
  error: string = '';
  success: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    const payload = {
      nombre: this.nombre,
      contrasena: this.contrasena,
      rol: 'USUARIO'  // fijo porque dijiste que todos serán usuarios
    };

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        this.success = res.message;  // mostramos el mensaje del backend
        this.error = '';
      },
      error: (err) => {
        // Si el backend devuelve JSON con error, lo mostramos
        this.error = err.error?.error || 'Error al registrar. Verifica los datos.';
        this.success = '';
      }
    });
  }

}
