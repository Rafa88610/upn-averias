import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { IDataResponse } from '../model/IDataResponse';
import { lastValueFrom } from 'rxjs';

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

interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  estado: string;
}

@Component({
  selector: 'app-registrarAveria',
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registrar-averia.component.html',
  styleUrl: './registrar-averia.component.css',
})
export class RegistrarAveriaComponent {
  // [x: string]: any;
  matcher = new MyErrorStateMatcher();

  productos: Producto[] = [];

  tipoDocumento: string = 'DNI';

  // Validacion de formularios---
  docDNIFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('^[0-9]+$'),
  ]);
  docPasaporteFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(20),
    Validators.maxLength(20),
    Validators.pattern('^[0-9a-zA-Z]+$'),
  ]);
  nombreFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
    Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$'),
  ]);
  apePatFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$'),
  ]);
  apeMatFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$'),
  ]);
  telefonoFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(9),
    Validators.pattern('^[0-9]+$'),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  direccionFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(200),
  ]);

  motivoFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(60),
  ]);
  nombreContactoFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(50),
    Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$'),
  ]);
  telfContactoFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(9),
    Validators.pattern('^[0-9]+$'),
  ]);
 
  descFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(200),
  ]);

  productoFormControl = new FormControl('', [Validators.required]);

  esDerivadoFormControl= new FormControl('');

  idCliente: number = 0;
  idAsesor: number = 0;

  // Metodos de las clases

  constructor(private dataService: DataService, private router: Router) {
    //const userString = localStorage.getItem('user');
    this.idAsesor = 4; // Asignar un ID de asesor fijo para pruebas
    //userString !== null ? Number(userString) : 0;

    this.listarProductos();
  }

  async listarProductos() {
    try {
      let response: IDataResponse = await lastValueFrom(
        this.dataService.listarProductos()
      );
      if (response.error) {
        console.error('Error al listar productos:', response);
      } else {
        this.productos = response.body;
      }
    } catch (error) {}
  }

  pressEnter(event: any) {
    console.log('Evento de tecla presionada:', event);
    if (event.key === 'Enter') {
      this.buscarCliente();
    }
  }

  async buscarCliente() {
    console.log('Tipo de documento:', this.tipoDocumento);

    let numDoc: string = '';

    if (this.tipoDocumento === 'DNI') {
      numDoc =
        this.docDNIFormControl.value == null
          ? ''
          : this.docDNIFormControl.value;
    } else if (this.tipoDocumento === 'Pasaporte') {
      numDoc =
        this.docPasaporteFormControl.value == null
          ? ''
          : this.docPasaporteFormControl.value;
    }

    try {
      let response: IDataResponse = await lastValueFrom(
        this.dataService.buscarCliente(numDoc)
      );
      if (response.error) {
        console.error('Error al buscar cliente:', response);
      } else {
        // Aquí puedes manejar la respuesta del cliente encontrado
        console.log('Cliente encontrado:', response.body);
        if (response.body) {
          // Asignar los valores del cliente encontrado a los controles del formulario
          this.idCliente = response.body.idCliente;

          this.nombreFormControl.setValue(response.body.nombres);
          this.apePatFormControl.setValue(response.body.apellPaterno);
          this.apeMatFormControl.setValue(response.body.apellMaterno);
          this.telefonoFormControl.setValue(response.body.telefono);
          this.emailFormControl.setValue(response.body.correo);
          this.direccionFormControl.setValue(response.body.direccion);

          this.disabledInputCliente();
        } else {
          this.enableInputCliente();
          this.limpiarCampos();
          this.idCliente = 0; // Reiniciar el ID del cliente si no se encuentra
          alert(
            'No se encontró ningún cliente con el número de documento proporcionado.'
          );
        }
        console.log(this.idCliente);
      }
    } catch (error) {
      console.error('Error al llamar al servicio buscarCliente:', error);
    }
  }

  async registrarAveria() {
    console.log(this.tipoDocumento);
   
    try {

      if (this.idCliente === 0) {
        const cliente = {
          tipoDoc: this.tipoDocumento,
          numDoc:
            this.tipoDocumento == 'DNI'
              ? this.docDNIFormControl.value
              : this.docPasaporteFormControl.value,
          nombres: this.nombreFormControl.value,
          apellPaterno: this.apePatFormControl.value,
          apellMaterno: this.apeMatFormControl.value,
          telefono: this.telefonoFormControl.value,
          direccion: this.direccionFormControl.value,
          correo: this.emailFormControl.value,
        };

       
        let response: IDataResponse = await lastValueFrom(
          this.dataService.registrarCliente(cliente)
        );
        if (response.error) {
          console.error('Error al registrar cliente:', response);
          alert('Error al registrar cliente. Inténtelo de nuevo.');
        } else {
          console.log('Cliente registrado con éxito:', response.body);
          this.idCliente = response.body;
        }
      }

      const averiaData = {
        idCliente: this.idCliente,
        idAsesor: this.idAsesor,
        motivo: this.motivoFormControl.value,
        nombContacto: this.nombreContactoFormControl.value,
        telefContacto: this.telfContactoFormControl.value,
        descripcion: this.descFormControl.value,
        idProducto: this.productoFormControl.value,
        esDerivado:this.esDerivadoFormControl.value =='' ? 0:this.esDerivadoFormControl.value
      };

      let response2: IDataResponse = await lastValueFrom(
        this.dataService.registrarAveria(averiaData)
      );
      if (response2.error) {
        console.error('Error al registrar avería:', response2);
        alert('Error al registrar la avería. Inténtelo de nuevo.');
      } else {
        console.log('Avería registrada con éxito:', response2.body);
        alert('Avería registrada con éxito.');
        this.router.navigate(['/atencion']);
      }
    } catch (error) {}
  }

  disabledInputCliente() {
    this.nombreFormControl.disable();
    this.apeMatFormControl.disable();
    this.apePatFormControl.disable();
    this.emailFormControl.disable();
    this.telefonoFormControl.disable();
    this.direccionFormControl.disable();
  }

  enableInputCliente() {
    this.nombreFormControl.enable();
    this.apeMatFormControl.enable();
    this.apePatFormControl.enable();
    this.emailFormControl.enable();
    this.telefonoFormControl.enable();
    this.direccionFormControl.enable();
  }

  limpiarCampos() {
    //this.docDNIFormControl.setValue('');
    this.docPasaporteFormControl.setValue('');
    this.nombreFormControl.setValue('');
    this.apePatFormControl.setValue('');
    this.apeMatFormControl.setValue('');
    this.telefonoFormControl.setValue('');
    this.emailFormControl.setValue('');
    this.direccionFormControl.setValue('');
  }

  volver(){
    this.router.navigate(['/atencion']);
  }
}
