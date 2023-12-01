import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  clave: string
  constructor (private authService: AuthService, private router: Router){}

  ngOnInit(){
    
    const longitud = 5

    for(let i = 0; i<longitud;i++){
      const digito=Math.floor(Math.random()*10)
      this.clave += digito.toString()
    }
    console.log(this.clave) 
     
  }

  SignUp(form: NgForm){
    if(form.invalid){
      alert("Debes llenar los campos!")
      return
    }

    localStorage.setItem('con', this.clave)

    console.log(localStorage.getItem('con'))

    this.authService.getCorreo(form.value.email, this.clave).subscribe( res =>{
    
      localStorage.setItem("email", form.value.email)
      localStorage.setItem("contraseña", form.value.password)
      localStorage.setItem("nombre", form.value.nombre)
      localStorage.setItem("apellido", form.value.apellido)
      localStorage.setItem("numero", form.value.numero)
      localStorage.setItem("usertipe", "usuario")

      console.log(res)
      this.router.navigate(['/codigo']);
    },
    err =>{
      console.log(err)
    })
  }
}
