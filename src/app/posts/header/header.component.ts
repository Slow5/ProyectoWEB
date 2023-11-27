import {Component} from '@angular/core';
import { AuthService } from '../auth.services';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html', 
    styleUrls: ['./header.component.css']
  })

export class HeaderComponent{

  nom: string
  entrar: string

  constructor(public authService : AuthService){}

  ngOnInit(){
    this.nom = localStorage.getItem('nombre')
  }

  mostrar(){
    
    let val = localStorage.getItem('validar')
    let validar = false;
    
    if(val?.includes("si")){
      validar=true;
    }else{
      validar=false;
    }
    return validar;
  }

  validar(){
    let usuario = localStorage.getItem('usertype');
    let validar = false;
      if(usuario?.includes("admin")){
          validar = true;
      }else{
        validar = false;
      }
      return validar;
  }
  
  cerrar(){
    this.authService.logOut();
  }
  
}