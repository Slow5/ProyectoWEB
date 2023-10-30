import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from "./user.model";
import { map } from 'rxjs'
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private url = 'http://localhost:3000/api'

    User ={}

    Register = {}
    
    constructor(private http: HttpClient, private router: Router){}
    
    signUp(email:String, password:String, usertype:String){
        this.Register = {
            email: email,
            password: password,
            usertype: usertype
        }

        return this.http.post<any>(this.url + '/signup', this.Register);
    }

    logIn(email:String, password:String){
        this.User = {
            email: email,
            password: password
        }
        return this.http.post<any>(this.url + '/login',this.User);
    }

    getAcountType(email:String, password:String){
        this.User = {
            email: email,
            password: password
        }
        return this.http.post<any>(this.url + '/type',this.User);
        
    }

    getUserId(email:String, password:String){
        this.User = {
            email: email,
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
        localStorage.removeItem('token');
        localStorage.removeItem('userid'); 
        localStorage.removeItem('usertype');
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
}