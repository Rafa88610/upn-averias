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
import { IDataResponse } from '../model/IDataResponse';
import { lastValueFrom } from 'rxjs';
import { DataService } from '../services/data.service';

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
    'id',
    'username',    
    'rol',
    'estado'  
  ];

  rol: string = ''; // Variable para almacenar el rol seleccionado
  listUsuarios:any[]=[];

  usuario = {
    id:0,
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

  dataSource = new MatTableDataSource<any>(this.listUsuarios);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('modalRegistro') modalRegistro: any;

  constructor(private dialog: MatDialog, private router: Router,private dataService: DataService) {
    this.listarUsuarios();
  }

  openDialog() {
    this.dialog.open(this.modalRegistro, {
      autoFocus: false,
      panelClass: 'modal_detalle',
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async listarUsuarios(){
    try {
      let response:IDataResponse=await lastValueFrom(this.dataService.listarUsuarios());
      if(response.error){
        console.error("Error al listar usuarios",response);
      }else{
        this.dataSource.data=response.body;
      }
    } catch (error) {
      console.error('Error al llamar al servicio listarUsuarios:', error);
    }

  }

  async registrarUsuario(){
    
    this.usuario.rol= this.rol;
    console.log(this.usuario);
    try {
      let response: IDataResponse = await lastValueFrom(
        this.dataService.registrarUsuario(this.usuario)
      );
      if (response.error) {
        console.error('Error al registrar usuario:', response);
        alert('Error al registrar la usuario. Inténtelo de nuevo.');
      } else {
        console.log('Usuario registrado con éxito:', response.body);
        alert('Usuario registrado con éxito.');
        this.dialog.closeAll();
        this.listarUsuarios();
      }
    } catch (error) {
      console.error('Error al llamar al servicio:', error);
      alert('Error al registrar usuario. Inténtelo de nuevo.');
    }


  }
}

