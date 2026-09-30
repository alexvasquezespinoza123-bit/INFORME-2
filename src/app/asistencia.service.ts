import { Injectable } from '@angular/core';
import { Empleado, Asistencia } from './empleado.model';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private empleados: Empleado[] = [
    { id: 1, dni: '72345678', nombre: 'Alex vasquez E.', cargo: 'Administrador de Sistemas' },
    { id: 2, dni: '45678912', nombre: 'Carlos Gómez', cargo: 'Desarrollador Frontend' },
    { id: 3, dni: '78912345', nombre: 'Lucía Torres', cargo: 'Ingeniera de Datos' },
    { id: 4, dni: '12345678', nombre: 'Mateo Quispe', cargo: 'Soporte Técnico' }
  ];

  private asistencias: Asistencia[] = [];

  getEmpleados(): Empleado[] {
    return this.empleados;
  }

  getAsistencias(): Asistencia[] {
    return this.asistencias;
  }

  agregarEmpleado(nuevo: { dni: string; nombre: string; cargo: string }): { exito: boolean; mensaje: string } {
    if (!nuevo.dni || !nuevo.nombre || !nuevo.cargo) {
      return { exito: false, mensaje: '⚠️ Error: Todos los campos son obligatorios.' };
    }

    if (nuevo.dni.length !== 8 || isNaN(Number(nuevo.dni))) {
      return { exito: false, mensaje: '⚠️ Error: El DNI debe tener exactamente 8 dígitos numéricos.' };
    }

    const existeDni = this.empleados.find(e => e.dni === nuevo.dni);
    if (existeDni) {
      return { exito: false, mensaje: `⚠️ Error: Ya existe un colaborador registrado con el DNI ${nuevo.dni}.` };
    }

    const idGenerado = this.empleados.length > 0 ? Math.max(...this.empleados.map(e => e.id)) + 1 : 1;
    
    this.empleados.push({
      id: idGenerado,
      dni: nuevo.dni,
      nombre: nuevo.nombre,
      cargo: nuevo.cargo
    });

    return { exito: true, mensaje: `¡Colaborador ${nuevo.nombre} registrado con éxito!` };
  }

  marcarAsistencia(idEmpleado: number): { exito: boolean; mensaje: string } {
    const empleado = this.empleados.find(e => e.id === idEmpleado);
    
    if (!empleado) {
      return { exito: false, mensaje: '⚠️ Error: Empleado no encontrado.' };
    }

    const ahora = new Date();
    const nuevaAsistencia: Asistencia = {
      idEmpleado: empleado.id,
      nombre: empleado.nombre,
      fecha: ahora.toISOString().split('T')[0],
      hora: ahora.toLocaleTimeString()
    };

    this.asistencias.push(nuevaAsistencia);
    return { exito: true, mensaje: `✅ ¡Asistencia registrada correctamente para ${empleado.nombre} a las ${nuevaAsistencia.hora}!` };
  }
}