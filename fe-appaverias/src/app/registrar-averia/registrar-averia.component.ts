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
  id: string;
  nombre: string;
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

  productos: Producto[] = [
    { id: 'steak-0', nombre: 'Steak' },
    { id: 'pizza-1', nombre: 'Pizza' },
    { id: 'tacos-2', nombre: 'Tacos' },
  ];

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
  // productoFormControl = new FormControl('', [Validators.required]);

  descFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(200),
  ]);

}
