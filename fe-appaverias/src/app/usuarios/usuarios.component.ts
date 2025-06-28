import { Component } from '@angular/core';
import {
  AfterViewInit,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-usuarios',
  imports: [
    FormsModule,
    CommonModule,
    MatPaginator,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements AfterViewInit {

  matcher = new MyErrorStateMatcher();

  displayedColumns: string[] = [
    'position',
    'userName',
    'contrasenia',
    'rol',
    'estado',
  ];

  rol: string = ''; // Variable para almacenar el rol seleccionado

  usuario = {
    username: '',
    contrasenia: '',
    rol: '',
    estado: '',
  };

  contraseniaFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$'), // Al menos una minúscula, una mayúscula, un número y un carácter especial
  ]);

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('modalRegistro') modalRegistro: any;

  constructor(private dialog: MatDialog, private router: Router) {}

  openDialog() {
    this.dialog.open(this.modalRegistro, {
      autoFocus: false,
      panelClass: 'modal_detalle',
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  position: number;
  userName: string;
  contrasenia: string;
  rol: string;
  estado: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    userName: 'Juan',
    contrasenia: 'Perez',
    rol: 'asesor',
    estado: 'habilitado',
  },
  {
    position: 2,
    userName: 'Rafael',
    contrasenia: 'Munoz',
    rol: 'asesor',
    estado: 'desabilitado',
  },
];
