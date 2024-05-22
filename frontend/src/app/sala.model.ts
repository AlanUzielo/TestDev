/*
  Definición de la interfaz Sala
  Se definen los atributos que tendrá un objeto de tipo Sala
*/
export interface Sala{
    id_sala: number; // Se define el atributo id_sala de tipo number
    nombre: string; // Se define el atributo nombre de tipo string
    ubicacion: string; // Se define el atributo ubicacion de tipo string
    capacidad: number; // Se define el atributo capacidad de tipo number
}