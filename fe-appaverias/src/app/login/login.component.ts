import { Component, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Data, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { last, lastValueFrom } from 'rxjs';
import { IDataResponse } from '../model/IDataResponse';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
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
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatGridListModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  matcher = new MyErrorStateMatcher();
  user = {
    username: '',
    contrasenia: '',
  };
  usuario: string = '';
  contrasenia: string = '';
  newContrasenia: string = '';

  contraseniaFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]+$/
      // '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+{}[]:;<>,.?~\\/-]).*$'
    ), // Al menos una minúscula, una mayúscula, un número y un carácter especial
  ]);

  newContraseniaFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]+$/
      // '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+{}[]:;<>,.?~\\/-]).*$'
    ), // Al menos una minúscula, una mayúscula, un número y un carácter especial
  ]);

  router = inject(Router);

  @ViewChild('modalContrasenia') modalContrasenia: any;

  constructor(private dataservice: DataService, private dialog: MatDialog) {}

  /* ---------- Llamada de servicios -------------- */
  async login() {
    console.log('Attempting to login with user:', this.user);
    try {
      let userData: IDataResponse = await lastValueFrom(
        this.dataservice.login(this.user)
      );

      if (userData.body.id > 0) {
        localStorage.setItem('user', JSON.stringify(userData.body.id));

        if (userData.body.rol === 'admin') {
          this.router.navigate(['/usuarios']);
        } else {
          this.router.navigate(['/atencion']);
        }
      } else {
        alert('Credenciales incorrectas, por favor intente nuevamente.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Credenciales incorrectas, por favor intente nuevamente.');
      return;
    }
  }

  openModal() {
    this.dialog.open(this.modalContrasenia, {
      autoFocus: false,
      panelClass: 'modal_detalle',
    });
  }

  async actualizarContrasenia() {
    if (
      this.contraseniaFormControl.value != this.newContraseniaFormControl.value
    ) {
      return;
    }

    try {
      let response: IDataResponse = await lastValueFrom(
        this.dataservice.actualizarContrasenia(this.usuario, this.contrasenia)
      );
      if (response.error) {
        alert('Error al actualizar contraseña');
      } else {
        alert('Contraseña actualizada');
        this.dialog.closeAll();
      }
    } catch (error) {
      alert('Error al actualizar contraseña. Inténtelo de nuevo.');
    }
  }
}
