import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { VistaSalasComponent } from './vista-salas/vista-salas.component';
import { VistaReservacionesComponent } from './vista-reservaciones/vista-reservaciones.component';
import { VistaSalaComponent } from './vista-sala/vista-sala.component';
import { EditarSalaComponent } from './editar-sala/editar-sala.component';
import { VistaReservacionComponent } from './vista-reservacion/vista-reservacion.component';
import { EditarReservacionComponent } from './editar-reservacion/editar-reservacion.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent}, // Ruta para la vista de inicio
    {path: 'salas', component: VistaSalasComponent}, // Ruta para la vista de salas
    {path: 'sala/:id_sala/:nombre/:ubicacion/:capacidad/:imagen', component: VistaSalaComponent}, // Ruta para la vista de una sala
    {path: 'editarsala', component: EditarSalaComponent}, // Lo reutilizamos para la creación de una sala
    {path: 'editarsala/:id_sala/:nombre/:ubicacion/:capacidad/:imagen', component: EditarSalaComponent}, // Ruta para la vista de edición de una sala
    {path: 'reservaciones', component: VistaReservacionesComponent}, // Ruta para la vista de reservaciones
    {path: 'reservacion/:id_reservacion/:id_sala/:fecha_inicio/:fecha_fin/:nombre/:imagen', component: VistaReservacionComponent}, // Ruta para la vista de una reservación
    {path: 'editarreservacion', component: EditarReservacionComponent}, // Reutilizamos para la creación de una reservación
    {path: 'editarreservacion/:id_reservacion/:id_sala/:fecha_inicio/:fecha_fin/:imagen', component: EditarReservacionComponent}, // Ruta para la vista de edición de una reservación 

    {path: '', redirectTo: '/inicio', pathMatch: 'full'}, // Ruta por defecto
    {path: '**', component: InicioComponent} // Ruta para cuando no se encuentra la ruta
    
];
