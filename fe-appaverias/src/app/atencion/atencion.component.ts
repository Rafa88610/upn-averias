import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { IDataResponse } from '../model/IDataResponse';
import { lastValueFrom } from 'rxjs';
import { Averia } from '../model/Averia';

@Component({
  selector: 'app-atencion',
  imports: [MatPaginator, MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './atencion.component.html',
  styleUrl: './atencion.component.css',
})
export class AtencionComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'cliente',
    'motivo',
    'producto',
    'datosContacto',
    'descripcion',
    'esDerivado',
  ];


  listAverias: any[] = [];

  dataSource = new MatTableDataSource<any>(this.listAverias);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private dataService: DataService, private router: Router) {
  this.listarAverias ();
  }

  async listarAverias() {

    try {
      const userString = localStorage.getItem('user');
      const userId = userString !== null ? Number(userString) : 0;

      let response: IDataResponse = await lastValueFrom(this.dataService.listarAverias(userId));
      if (response.error) {
        console.error('Error al listar averías:', response);
      } else {
        this.dataSource.data = response.body;
      }
    } catch (error) {
      console.error('Error al llamar al servicio listarAverias:', error);
    }
  }

}

// export interface PeriodicElement {
//   position: number;
//   documento: string;
//   nombres: string;
//   apellidos: string;
//   telefono: string;
//   correo: string;
//   direccion: string;
//   motivo: string;
//   producto: string;
//   nomContacto: string;
//   telfContacto: string;
//   descripcion: string;
//   estado: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     position: 1,
//     documento: '45101646',
//     nombres: 'Juan',
//     apellidos: 'Perez',
//     telefono: '987654321',
//     correo: 'juan@unzip.pe',
//     direccion: 'Av. Siempre Viva 123',
//     motivo: 'Consulta',
//     producto: 'Producto A',
//     nomContacto: 'Maria',
//     telfContacto: '987654321',
//     descripcion: 'Consulta sobre el producto A',
//     estado: 'Pendiente',
//   },
//   {
//     position: 2,
//     documento: '45101647',
//     nombres: 'Ana',
//     apellidos: 'Lopez',
//     telefono: '987654322',
//     correo: 'anasophia@upn.pe',
//     direccion: 'Av. Siempre Viva 456',
//     motivo: 'Reclamo',
//     producto: 'Producto B',
//     nomContacto: 'Carlos',
//     telfContacto: '987654323',
//     descripcion: 'Reclamo sobre el producto B',
//     estado: 'En Proceso',
//   },
// ];
