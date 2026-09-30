export interface Empleado {
  id: number;
  dni: string;
  nombre: string;
  cargo: string;
}

export interface Asistencia {
  idEmpleado: number;
  nombre: string;
  fecha: string;
  hora: string;
}