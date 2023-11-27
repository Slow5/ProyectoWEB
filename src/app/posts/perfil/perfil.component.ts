import { Component } from '@angular/core';
import { AuthService } from '../auth.services';
import { User } from '../user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  
  nombre: string
  apellido: string
  correo: string
  telefono: string
  usuario: string

  customData: any;

  constructor(private authService: AuthService){}
  
  ngOnInit(){

    this.customData = localStorage.getItem('userid');

    this.nombre = localStorage.getItem('nombre')
    this.apellido = localStorage.getItem('apellido')
    this.correo = localStorage.getItem('email')
    this.telefono = localStorage.getItem('numero')
    this.usuario = localStorage.getItem('usertype')

  }

  onDelete(){
    const id = localStorage.getItem('userid')
    this.authService.deleteUser(id);
    alert("Perfil Eliminado");
    this.authService.logOut();
  }
}
