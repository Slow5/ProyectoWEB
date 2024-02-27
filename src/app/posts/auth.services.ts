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
    
    //private url = 'http://localhost:3000/api'
    private url = 'https://lvrnmkg9-3000.usw3.devtunnels.ms'
    User = {}

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
            image: string
        }>(this.url + "/api/users/" + id);
    }

    getEmailId(email:string){
        this.User = {
            email: email
        }
        return this.http.post<{any}>(this.url + "/api/correo-id/", this.User);
    }

    signUp(email:String, password:String,nombre: String, apellido: String, numero:String, usertype:String, image: String){
        this.Register = {
            email: email,
            password: password,
            nombre: nombre,
            apellido: apellido,
            numero: numero,
            image: image,
            usertype: usertype
        }
        return this.http.post<any>(this.url + '/api/signup', this.Register);
    }

    getCorreo(email:string, clave: string){
        this.Register={
            email:email,
            clave: clave
        }
        return this.http.post<{any}>(this.url + "/api/enviar-correo", this.Register)
    }

    logIn(nombre:String, password:String){
        this.User = {
            nombre: nombre,
            password: password
        }
        return this.http.post<any>(this.url + '/api/login',this.User);
    }

    getAcountType(nombre:String, password:String){
        this.User = {
            nombre: nombre,
            password: password
        }
        return this.http.post<any>(this.url + '/api/type',this.User);   
    }

    getUserId(nombre:String, password:String){
        this.User = {
            nombre: nombre,
            password: password
        }
        return this.http.post<any>(this.url + '/api/emailId',this.User);
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
        localStorage.removeItem('apelllido'); 
        localStorage.removeItem('imagen'); 
        localStorage.removeItem('image');
        localStorage.removeItem('orden');
        localStorage.removeItem('contenido');

        localStorage.removeItem('plato')
        
        this.router.navigate(['/login']);
    }

    
    //obtener datos de usuarios

    private users: User[] = []; 
    private userUpdate = new Subject<User[]>();

    getUser(){
        this.http.get<{message: string, users: any}>(this.url + '/api/user')
        .pipe(map((userData)=>{
            return userData.users.map(users=> {
                return{
                    id: users._id,
                    email: users.email,
                    password: users.password,
                    apellido: users.apellido,
                    nombre: users.nombre,
                    numero: users.numero,
                    image: users.image,
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
        this.http.delete(this.url + "/api/deleteuser/"+ id)
        .subscribe(()=>{
            console.log('Eliminado');
            this.getUser();
        });
    }

    getUsers(usuario: { email: string }): Observable<any> {
        return this.http.post(this.url + "/api/getUser", usuario);
    }

    UpdateUser(id: string, email: string, password: string, 
        nombre: string, apellido: string, numero: string, 
         usertype: string,image: File | string){
        
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
                usertype: usertype,
                image: image,
            };
        }

        this.http.put(this.url + "/api/users/" + id, postData)
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
                usertype: usertype,
                image: "",
            }
            
            updatePost[oldPostIndex] = user;
            this.users = updatePost;
            this.userUpdate.next([...this.users]); 
            this.router.navigate(["/main"]);
        });
    }

    getUsuarios(){
        this.http.get<{message: string, posts: any}>(this.url + '/api/posts')
        .pipe(map((postData)=>{
            return postData.posts.map(post=> {
                return{
                email:post.email,
                password:post.password, 
                nombre: post.nombre, 
                apellido: post.apellido, 
                numero: post.numero, 
                usertype: post.usertype, 
                image: post.image
                }
            })
        })).subscribe((publicacionTrasnformada) => {
            this.users = publicacionTrasnformada;
            this.userUpdate.next([...this.users]);
        });
    }
}