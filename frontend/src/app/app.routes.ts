import { Routes } from '@angular/router';
import { ArbitrosComponent } from './components/arbitros/arbitros.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { TipoEventosComponent } from './components/tipo-eventos/tipo-eventos.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { JornadasComponent } from './components/jornadas/jornadas.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GestionArbitrosComponent } from './components/gestion-arbitros/gestion-arbitros.component';
import { ArbitrarComponent } from './components/arbitrar-partido/arbitrar-partido.component'; // Importa el nuevo componente

export const routes: Routes = [
    { path: 'arbitros', component: ArbitrosComponent },
    { path: 'equipos', component: EquiposComponent },
    { path: 'jugadores', component: JugadoresComponent },
    { path: 'tipoeventos', component: TipoEventosComponent },
    { path: 'eventos', component: EventosComponent },
    { path: 'jornadas', component: JornadasComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'gestion-arbitros', component: GestionArbitrosComponent },
    { path: 'arbitrar/:id', component: ArbitrarComponent },
];
