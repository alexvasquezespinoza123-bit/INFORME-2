import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsistenciaService } from '../asistencia.service';
import { Empleado, Asistencia } from '../empleado.model';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class BodyComponent implements OnInit {
  empleados: Empleado[] = [];
  asistencias: Asistencia[] = [];
  
  // Filtro de búsqueda instantánea por DNI o Nombre
  filtroTexto: string = '';

  // Campos del formulario para nuevo trabajador
  nuevoDni: string = '';
  nuevoNombre: string = '';
  nuevoCargo: string = '';

  // Alertas visuales dinámicas
  mensajeAlerta: string = '';
  alertaExitoso: boolean = false;

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.empleados = this.asistenciaService.getEmpleados();
    this.asistencias = this.asistenciaService.getAsistencias();
  }

  // Getter inteligente que filtra en tiempo real por DNI o Nombre
  get empleadosFiltrados(): Empleado[] {
    if (!this.filtroTexto.trim()) {
      return this.empleados;
    }
    const texto = this.filtroTexto.toLowerCase().trim();
    return this.empleados.filter(e => 
      e.nombre.toLowerCase().includes(texto) || e.dni.includes(texto)
    );
  }

  registrarNuevoTrabajador(): void {
    const resultado = this.asistenciaService.agregarEmpleado({
      dni: this.nuevoDni,
      nombre: this.nuevoNombre,
      cargo: this.nuevoCargo
    });

    this.mensajeAlerta = resultado.mensaje;
    this.alertaExitoso = resultado.exito;

    if (resultado.exito) {
      this.nuevoDni = '';
      this.nuevoNombre = '';
      this.nuevoCargo = '';
      this.cargarDatos();
    }

    setTimeout(() => { this.mensajeAlerta = ''; }, 4500);
  }

  registrarAsistencia(idEmpleado: number): void {
    const resultado = this.asistenciaService.marcarAsistencia(idEmpleado);
    this.mensajeAlerta = resultado.mensaje;
    this.alertaExitoso = resultado.exito;
    this.cargarDatos();

    setTimeout(() => { this.mensajeAlerta = ''; }, 4500);
  }
}