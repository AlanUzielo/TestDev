/*
    Se define la interfaz Reservacion
    Se definen los atributos que tendrá un objeto de tipo Reservacion
*/
export interface Reservacion{
    id_reservacion: number, // Se define el atributo id_reservacion de tipo number
    id_sala: number, // Se define el atributo id_sala de tipo number
    fecha_inicio: Date, // Se define el atributo fecha_inicio de tipo Date
    fecha_fin: Date // Se define el atributo fecha_fin de tipo Date
}