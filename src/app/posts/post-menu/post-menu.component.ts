import { Component, LOCALE_ID, OnInit } from "@angular/core";
import { MenuService } from "../menu.service";
import { Menu } from "../menu.model";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
    selector: 'app-menu',
    templateUrl: './post-menu.component.html',
    styleUrls: ['./post-menu.component.css']
  })

export class PostMenuComponent implements OnInit{
  
  user:string

  titulo: string
  descripcion: string
  precio: string

  valida: string

  menus:Menu[] = [];

  private menuSub: Subscription;

  constructor(private menuService: MenuService){}
  
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
      this.titulo = localStorage.getItem('nombre')
      this.precio = localStorage.getItem('apellido')
      
      localStorage.setItem('plato', this.titulo)
      localStorage.setItem('contenido',pedido.value.pedido)

      this.descripcion = pedido.value.pedido
    
      console.log('Pedido enviado:', this.precio);
    
      console.log('Pedido enviado:', this.titulo);

      this.menuService.getPedido(this.titulo, this.descripcion, this.precio).subscribe(menu => {
        alert("Pedido Enviado")
        pedido.reset();
      });
    }
  }

  generatePDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const titulo = localStorage.getItem('plato');
    const contenido = localStorage.getItem('contenido')

    const contenidoPDF = `Usuario: ${titulo}\n\nContenido: ${contenido}`;

    const documentDefinition = {
      content: [
        { text: titulo, style: 'titulo' },
        { text: contenidoPDF, style: 'contenido' }
      ],
      styles: {
        titulo: { fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
        contenido: { fontSize: 12 }
      }
    };

    pdfMake.createPdf(documentDefinition).open();
    //pdfMake.createPdf(documentDefinition).download('generar.pdf');
  }

}