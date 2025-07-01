import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import {
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { IDataResponse } from '../model/IDataResponse';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-atencion',
  imports: [MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './atencion.component.html',
  styleUrl: './atencion.component.css',
})
export class AtencionComponent implements OnInit {
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

  @ViewChild('paginatorAtencion', { static: false })
  paginatorAtencion!: MatPaginator;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit():void {
    this.listarAverias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginatorAtencion;
  }

  

  async listarAverias() {
    try {
      const userString = localStorage.getItem('user');
  
      const userId = userString !== null ? Number(userString) : 0;

      console.log('AsesorID', userId);

      let response: IDataResponse = await lastValueFrom(
        this.dataService.listarAverias(userId)
      );
      if (response.error) {
        console.error('Error al listar averías:', response);
      } else {
        this.listAverias = response.body;
        this.dataSource.data = this.listAverias;
      }
    } catch (error) {
      //console.error('Error al llamar al servicio listarAverias:', error);
    }
  }

  irRegistrarAveria() {
    this.router.navigate(['/registrar-averia']);
  }
}

