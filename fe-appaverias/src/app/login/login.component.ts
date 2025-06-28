import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user = {
    username: '',
    contrasenia: '',
  };

  router = inject(Router);

  constructor(private dataservice: DataService) {}

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
}
