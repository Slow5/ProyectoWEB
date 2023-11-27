import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from "./user.model";
import { map } from 'rxjs'
import { Subject } from "rxjs";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    
    private url = 'http://localhost:3000/api'

    User ={}

    Register = {}
    
    constructor(private http: HttpClient, private router: Router){}

    getUsuario(id:string){
        return this.http.get<{_id:string, 
            email:string, 
            password:string, 
            nombre: string, 
            apellido: string, 
            numero:string, 
            usertype:string, 
            image: string}>(
            "http://localhost:3000/api/users/" + id
        );
    }

    signUp(email:String, password:String,nombre: String, apellido: String, numero:String, usertype:String){
        this.Register = {
            email: email,
            password: password,
            nombre: nombre,
            apellido: apellido,
            numero: numero,
            image: null,
            usertype: usertype
        }
        return this.http.post<any>(this.url + '/signup', this.Register);
    }

    getCorreo(email:string, clave: string){
        this.Register={
            email:email,
            clave: clave
        }
        return this.http.post<{any}>("http://localhost:3000/api/enviar-correo", this.Register)
    }

    logIn(nombre:String, password:String){
        this.User = {
            nombre: nombre,
            password: password
        }
        return this.http.post<any>(this.url + '/login',this.User);
    }

    getAcountType(nombre:String, password:String){
        this.User = {
            nombre: nombre,
            password: password
        }
        return this.http.post<any>(this.url + '/type',this.User);   
    }

    getUserId(nombre:String, password:String){
        this.User = {
            nombre: nombre,
            password: password
        }
        return this.http.post<any>(this.url + '/emailId',this.User);
    }

    loggedIn(){
        return !!localStorage.getItem('token');
    }

    getToken(){
        return localStorage.getItem('token');
    }

    logOut(){
        localStorage.removeItem('numero')
        localStorage.removeItem('gmail')
        localStorage.removeItem('email')
        localStorage.removeItem('usuario')
        localStorage.removeItem('TipoUsuario')
        localStorage.removeItem('apellido')
        localStorage.removeItem('nombre')
        localStorage.removeItem('token');
        localStorage.removeItem('userid'); 
        localStorage.removeItem('usertype');
        localStorage.removeItem('contraseña');
        localStorage.removeItem('apelllido')
        this.router.navigate(['/login']);
    }

    //obtener datos de usuarios

    private users: User[] = []; 
    private userUpdate = new Subject<User[]>();

    getUser(){
        this.http.get<{message: string, users: any}>('http://localhost:3000/api/user')
        
        .pipe(map((userData)=>{
            return userData.users.map(users=> {
                return{
                    id: users._id,
                    email: users.email,
                    password: users.password,
                    apellido: users.apellido,
                    nombre: users.nombre,
                    numero: users.numero,
                    image: null,
                    usertype: users.usertype
                }
            })
        }))

        .subscribe((publicacionTrasnformada) => {
            this.users = publicacionTrasnformada;
            this.userUpdate.next([...this.users]);
        });
    }

    getUserUpdateListerner(){
        return this.userUpdate.asObservable();
    }
    
    deleteUser(id: string){
        this.http.delete("http://localhost:3000/api/deleteuser/"+ id)
        .subscribe(()=>{
            console.log('Eliminado');
            this.getUser();
        });
    }

    getUsers(usuario: { email: string }): Observable<any> {
        return this.http.post("http://localhost:3000/api/getUser", usuario);
    }

    UpdateUser(id: string, email: string, password: string, 
        nombre: string, apellido: string, numero: string, 
        image: File | string, usertype: string){
        
        let postData;
        
        if(typeof image === "object"){

            postData = new FormData();
            
            postData.append("id", id);
            postData.append("email", email);
            postData.append("password", password);
            postData.append("nombre", nombre);
            postData.append("apellido", apellido);
            postData.append("numero", numero);
            postData.append("usertype", usertype)
            postData.append("image", image, nombre);

        }else {
              postData = {
                id:id,
                email: email,
                password: password,
                apellido: apellido,
                nombre: nombre,
                numero: numero,
                image: image,
                usertype: usertype,
                
            };
        }

        this.http.put("http://localhost:3000/api/users/" + id, postData)
        .subscribe(response =>{
            const updatePost = [...this.users];
            const oldPostIndex = updatePost.findIndex(p => p.id === id);
            const user: User = {
                id: id, 
                email: email,
                password: password,
                apellido: apellido,
                nombre: nombre,
                numero: numero, 
                image: "",
                usertype: usertype,
            }

            updatePost[oldPostIndex] = user;
            this.users = updatePost;
            this.userUpdate.next([...this.users]); 
            this.router.navigate(["/main"]);
        });
    }

}