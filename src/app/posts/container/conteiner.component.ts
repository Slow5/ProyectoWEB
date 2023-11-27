import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-conteiner',
  templateUrl: './conteiner.component.html',
  styleUrls: ['./conteiner.component.css']
})
export class ConteinerComponent implements OnInit{
  
  constructor(private auth: AuthService){}
  
  user={}
 
  pru = {}
  nom: string
  gmail: string
  identificador: string

  ngOnInit(){
    this.obtener();
  }

  obtener(){
    
    const usuario = localStorage.getItem('gmail')

    console.log('UserID:', usuario);
    this.auth.getUsers({email: usuario}).subscribe(
      (res: any) =>{
      if (res) {
        localStorage.setItem('email', res.gmail);
        localStorage.setItem('apellido', res.apellido);
        localStorage.setItem('numero', res.numero);
        localStorage.setItem('nombre', res.nom);
      } else {
        console.error('Datos de usuario no válidos:', res);
      } 
    }); 
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
}
