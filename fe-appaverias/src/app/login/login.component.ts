import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,MatCardModule,MatInputModule,MatButtonModule,MatIconModule,MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user={
    email: '',
    password: ''
  };
  storeUser={
    email: 'test@gmail.com',
    password: 'pass123',
  };

  router=inject(Router);

  validateLogin(email:string,password:string):boolean{
    return email === this.storeUser.email && password === this.storeUser.password;
  }

  login(){
    console.log("this.user");
    if(this.validateLogin(this.user.email, this.user.password)){
      localStorage.setItem('loggedInUser', JSON.stringify(this.user.email));
      this.router.navigate(['/registrar-averia']);
    }else{
      alert('email o contraseña incorrectos');

    }
  }
}


