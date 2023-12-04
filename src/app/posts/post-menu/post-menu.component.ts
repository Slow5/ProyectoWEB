import { Component, LOCALE_ID, OnInit } from "@angular/core";
import { MenuService } from "../menu.service";
import { Menu } from "../menu.model";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";

import { NgFor } from "@angular/common";

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
    selector: 'app-menu',
    templateUrl: './post-menu.component.html',
    styleUrls: ['./post-menu.component.css']
  })

export class PostMenuComponent implements OnInit{
  
  user:string
  numeroAleatorio: number;
  titulo: string
  descripcion: string
  precio: string
  horaActual: string;

  menus:Menu[] = [];

  private menuSub: Subscription;

  constructor(public menuService: MenuService){}
  
  ngOnInit(){
    this.user = localStorage.getItem('usuario')
    this.menuService.getMenus();
    this.menuSub = this.menuService.getMenuUpdateListerner().subscribe((menus: Menu[]) =>{
      this.menus = menus;
    });
  }

  enviarPedido(pedido:NgForm) {

    if(pedido.value.pedido == ""){
      alert("llenar campos")
    }else{

      this.numeroAleatorio = Math.floor(Math.random() * 90000) + 10000;
      
      localStorage.setItem("orden", this.numeroAleatorio.toString());

      this.titulo = localStorage.getItem('nombre')
      this.precio = this.numeroAleatorio.toString();
      this.descripcion = pedido.value.pedido

      localStorage.setItem('contenido',pedido.value.pedido)
    
      this.menuService.getPedido(this.titulo, this.descripcion, this.precio).subscribe(menu => {
        alert("Pedido Enviado")
        pedido.reset();
      });
    }
  }

  agregarCeroDelante(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }
  
  generatePDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // Crear un nuevo objeto Date para obtener la hora actual
    const fechaActual = new Date();

    // Obtener la hora, minutos y segundos
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();

    // Formatear la hora en un formato deseado (por ejemplo, HH:MM:SS)
    this.horaActual = `${this.agregarCeroDelante(horas)}:${this.agregarCeroDelante(minutos)}:${this.agregarCeroDelante(segundos)}`;

    const usuario = localStorage.getItem('usuario')
    const nombre = localStorage.getItem('nombre')
    const apellido = localStorage.getItem('apellido')
    const correo = localStorage.getItem('gmail') 
    const contenido = localStorage.getItem('contenido')
    const orden = localStorage.getItem('orden')

      const tableContent = [
        [{ text: 'Título', style: 'tableHeader' },],
        ["hora: " + this.horaActual],
        ["usuario:" + usuario],
        ["nombre: " + nombre],
        ["apelido: " + apellido],
        ["correo: " + correo], 
        ["Pedido: " + contenido]
      ];

    // Definir el documento PDF
    const docDefinition = {
      content: [
        { text: 'Pedido: ' + orden , style: 'title' },
        {
          table: {
            body: 
            tableContent
          },
        },
      ],
      styles: {
        title: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
          fillColor: '#eeeeee',
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
    //pdfMake.createPdf(documentDefinition).download('generar.pdf');
  }

}