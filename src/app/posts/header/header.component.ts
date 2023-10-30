import {Component} from '@angular/core';
import { AuthService } from '../auth.services';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html', 
    styleUrls: ['./header.component.css']
  })

export class HeaderComponent{
  constructor(public authService : AuthService){}

  cerrar(){
    this.authService.logOut();
  }
  
}