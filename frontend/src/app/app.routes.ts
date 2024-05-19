import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { VistaSalasComponent } from './vista-salas/vista-salas.component';
import { VistaReservacionesComponent } from './vista-reservaciones/vista-reservaciones.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent}, // Ruta para la vista de inicio
    {path: 'salas', component: VistaSalasComponent}, // Ruta para la vista de salas
    {path: 'reservaciones', component: VistaReservacionesComponent}, // Ruta para la vista de reservaciones

    {path: '', redirectTo: '/inicio', pathMatch: 'full'}, // Ruta por defecto
    {path: '**', component: InicioComponent} // Ruta para cuando no se encuentra la ruta
    
];
