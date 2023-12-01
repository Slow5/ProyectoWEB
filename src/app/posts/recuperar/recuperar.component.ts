import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {
  
  email: string

  constructor(private authService: AuthService, private router:Router){}
  
  enviar(login:NgForm){

    this.email = login.value.correo
    
    this.authService.getEmailId(this.email).subscribe(res => {
        alert("Correo Enviado a " + login.value.correo);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error al enviar el correo:', error.message);
      }
    );
  }
}
