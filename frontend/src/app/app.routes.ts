import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { VistaSalasComponent } from './vista-salas/vista-salas.component';
import { VistaReservacionesComponent } from './vista-reservaciones/vista-reservaciones.component';
import { VistaSalaComponent } from './vista-sala/vista-sala.component';
import { VistaReservacionComponent } from './vista-reservacion/vista-reservacion.component';
import { FormularioSalaComponent } from './formulario-sala/formulario-sala.component';
import { FormularioReservacionComponent } from './formulario-reservacion/formulario-reservacion.component';

export const routes: Routes = [
    // Se definen las rutas de la aplicación:
    {path: 'inicio', component: InicioComponent}, // Ruta para la vista de inicio
    {path: 'salas', component: VistaSalasComponent}, // Ruta para la vista de salas
    {path: 'sala/:id_sala/:nombre/:ubicacion/:capacidad/:imagen', component: VistaSalaComponent}, // Ruta para la vista de una sala
    {path: 'nuevasala', component: FormularioSalaComponent}, // Ruta para la vista de creación de una sala
    {path: 'editarsala/:id_sala/:nombre/:ubicacion/:capacidad/:imagen', component: FormularioSalaComponent}, // Ruta para la vista de edición de una sala
    {path: 'reservaciones', component: VistaReservacionesComponent}, // Ruta para la vista de reservaciones
    {path: 'reservacion/:id_reservacion/:id_sala/:fecha_inicio/:fecha_fin/:nombre/:imagen', component: VistaReservacionComponent}, // Ruta para la vista de una reservación
    {path: 'nuevareservacion', component: FormularioReservacionComponent}, // Ruta para la vista de creación de una reservación
    {path: 'editarreservacion/:id_reservacion/:id_sala/:fecha_inicio/:fecha_fin/:imagen/:nombre', component: FormularioReservacionComponent}, // Ruta para la vista de edición de una reservación 

    {path: '', redirectTo: '/inicio', pathMatch: 'full'}, // Ruta por defecto
    {path: '**', component: InicioComponent} // Ruta para cuando no se encuentra la ruta
];
