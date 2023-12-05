import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-ingresar-menu',
  templateUrl: './ingresar-menu.component.html',
  styleUrls: ['./ingresar-menu.component.css']
})
export class IngresarMenuComponent {
  
  menus:Menu[]=[]
  menuSub: Subscription;

  constructor(private menuService: MenuService){}

  ngOnInit(){
    this.menuService.getMenus();
    this.menuSub = this.menuService.getMenuUpdateListerner().subscribe((menus: Menu[]) =>{
      this.menus = menus;
    });
  }

  ingresar(login:NgForm){
    if(login.invalid){
      alert("No ingreso datos");
      return;
    }

    this.menuService.addMenu(login.value.titulo, login.value.descripcion, login.value.precio).subscribe(res=>{
      alert("Menu Insertado")
      login.reset();
    });
  }

  eliminar(id: string){
    this.menuService.deleteMenu(id);
  }

}

