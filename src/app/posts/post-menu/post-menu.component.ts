import { Component } from "@angular/core";

export interface PeriodicElement {
  Hambuerguesa: string;
  Ingredientes: string;
  Precio: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Hambuerguesa: 'CLASICA DE LA CASA', Ingredientes: 'Carne 100% de Diezmillo, mezclada con trozos de Tocino, Queso Americano, Lechuga, Jitomate, Cebolla y Pepinillos', Precio: 125},
  {Hambuerguesa: 'CLASICA DOBLE CARNE', Ingredientes: 'Disfrutala con Doble Porcion de Carne', Precio: 155},
  {Hambuerguesa: 'A LA BBQ', Ingredientes: 'Carne 100% de Diezmillo, Bañada en Salsa Bbq, Tocino, Queso Chedar, Cebolla Glasiada(Aros de Cabolla Opcional)', Precio: 130},
  {Hambuerguesa: 'BUFFALO RANCH', Ingredientes: 'Tenders de Pollo bañadas en salsa Buffalo, un toque de nuestro aderezo Ranch, Queso Chedar, Lechuga, Cebolla, Jitomate y Pepinillo', Precio: 130},
  {Hambuerguesa: 'CRISPY CHICKEN', Ingredientes: 'Tenders de Pollo, Queso Americano, Lechuga, Jitomate, Cebolla y Pepinillo', Precio: 125},
  {Hambuerguesa: 'HONEY MUSTARD', Ingredientes: 'Tenders de Pollo Bañado en Salsa Honey Mustard, Queso Americano, Lechuga, Jitomate, Cebolla y Pepinillo', Precio: 130},
];

export interface Elemento {
  Hambuerguesa: string;
  Ingredientes: string;
  Precio: number;
}

const DATA: Elemento[] = [
  {Hambuerguesa: 'NACHOS', Ingredientes: 'BAÑADAS EN QUESO CHEDAR, EXQUISITOS PICO DE GALLO Y JALAPEÑOS', Precio: 85},
  {Hambuerguesa: 'OREDEN DE PAPAS', Ingredientes: 'A LA FRANCESA, SAZONADAS CON SAL Y PARMESANO', Precio: 80},
  {Hambuerguesa: 'PAPAS BBQ HOUSE', Ingredientes: 'A LA FRANCESA, BAÑADAS EN QUESO CHEDAR, TROZOS DE TOCINO Y UN TOQUE DE PEREJIL', Precio: 85},
  {Hambuerguesa: 'PAPAS BUFFALO RANCH', Ingredientes: 'A LA FRANCESA BAÑADAS EN SALSA BUFFALO Y ADEREZO RANCHO, QUESO JACK Y UN TOQUE DE PEREJIL', Precio: 95},
  {Hambuerguesa: 'PAPAS DE ASADA', Ingredientes: 'Tenders de Pollo, Queso Americano, Lechuga, Jitomate, Cebolla y Pepinillo', Precio: 120},
  {Hambuerguesa: 'PAQUE COMPARTAS', Ingredientes: '6 BONELESS, 4 DEDOS DE QUESO, 6 AROS DE CEBOLLA Y PAPAS A LA FRANCESA CON 2 ADEREZOS DE TU ELECCION', Precio: 220},
];

@Component({
    selector: 'app-menu',
    templateUrl: './post-menu.component.html',
    styleUrls: ['./post-menu.component.css']
  })

export class PostMenuComponent{
  displayedColumns: string[] = ['Hamburguesa', 'Ingredientes', 'Precio'];
  dataSource = ELEMENT_DATA;

  Columns: string[] = ['Hamburguesa', 'Ingredientes', 'Precio'];
  dataSourceII = DATA;
}