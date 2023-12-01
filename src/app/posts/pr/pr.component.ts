import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-pr',
  templateUrl: './pr.component.html',
  styleUrls: ['./pr.component.css']
})
export class PrComponent {
  
  codigo: String

  email: String
  password: String
  nombre: String
  apellido: String
  numero: String


  constructor (private authService: AuthService, private router: Router){}

  SignUp(form:NgForm){
    if(form.invalid){
      alert("Debes llenar los campos!")
      return
    }

    this.codigo = localStorage.getItem('con')
    
    if(this.codigo == form.value.code){
      
        this.email = localStorage.getItem('email'),
        this.password = localStorage.getItem('contraseña'),
        this.nombre = localStorage.getItem('nombre')
        this.apellido = localStorage.getItem('apellido')
        this.numero = localStorage.getItem('numero')

      this.authService.signUp(this.email, this.password, this.nombre, this.apellido, this.apellido, "usuario").subscribe( res =>{
        
        localStorage.removeItem("email")
        localStorage.removeItem("contraseña")
        localStorage.removeItem("nombre")
        localStorage.removeItem("apellido")
        localStorage.removeItem("numero")
        localStorage.removeItem("usertipe")
        localStorage.removeItem("con")

        console.log(res)
        this.router.navigate(['/login']);
      },
      err =>{
        console.log(err)
      })
    }
  } 
}
