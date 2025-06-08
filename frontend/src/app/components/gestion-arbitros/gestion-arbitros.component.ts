import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-gestion-arbitros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-arbitros.component.html',
  styleUrls: ['./gestion-arbitros.component.css']
})
export class GestionArbitrosComponent implements OnInit {
  usuarios: any[] = [];
  arbitros: any[] = [];

  usuarioSeleccionado: any = null;
  arbitroSeleccionadoId: number = 0; // inicializado a 0
  mostrarModal = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.adminService.getUsuariosNormales().subscribe(usuarios => {
      this.usuarios = usuarios;
    });

    this.adminService.getArbitros().subscribe(arbitros => {
      this.arbitros = arbitros;
    });
  }

  abrirModal(usuario: any): void {
    this.usuarioSeleccionado = usuario;
    this.arbitroSeleccionadoId = 0; // opción por defecto "Selecciona un árbitro"
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.usuarioSeleccionado = null;
    this.arbitroSeleccionadoId = 0;
  }

  confirmarAsignacion(): void {
    const arbitroIdNum = Number(this.arbitroSeleccionadoId);

    if (!arbitroIdNum || arbitroIdNum === 0) {
      alert('Selecciona un árbitro');
      return;
    }

    this.adminService.asignarArbitro(this.usuarioSeleccionado.id, arbitroIdNum).subscribe({
      next: () => {
        alert('Asignado correctamente');
        this.cargarDatos();
        this.cerrarModal();
      },
      error: () => alert('Error al asignar árbitro')
    });
  }

}
