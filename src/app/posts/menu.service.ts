import { Injectable } from "@angular/core"
import { Menu } from "./menu.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs'
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})


export class MenuService{
    Menu = {}
    private menu: Menu[] = []; 
    private menuUpdate = new Subject<Menu[]>();

    constructor(private http: HttpClient){}

    addMenu(titulo: String, descripcion:String, precio: String){
        this.Menu={
            titulo:titulo, 
            descripcion: descripcion,
            precio: precio
        }
        return this.http.post<any>('http://localhost:3000/api/menu/ingresar', this.Menu);
    }

    getMenus(){
        this.http.get<{message: string, menu: any}>('http://localhost:3000/api/menu')
        .pipe(map((postData)=>{
            return postData.menu.map(menu=> {
                return{
                    id: menu._id, 
                    titulo: menu.titulo, 
                    descripcion: menu.descripcion,
                    precio: menu.precio
                }
            })
        }))
        .subscribe((publicacionTrasnformada) => {
            this.menu = publicacionTrasnformada;
            this.menuUpdate.next([...this.menu]);
        });
    }

    getMenuUpdateListerner(){
        return this.menuUpdate.asObservable();
    }

    getPedido(titulo:string, descripcion: string, precio:string){
        this.Menu={
            titulo:titulo,
            descripcion: descripcion,
            precio: precio
        }
        return this.http.post<{any}>("http://localhost:3000/api/correo-pedido", this.Menu)
    }

    deleteMenu(id: string){
        this.http.delete("http://localhost:3000/api/menu/"+ id)
        .subscribe(()=>{
            const updatePost = this.menu.filter(post => post.id !== id);
            this.menu = updatePost;
            this.menuUpdate.next([...this.menu])
        });
    }
}