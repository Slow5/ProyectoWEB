import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private url = 'http://localhost:3000/api'

    User ={}

    Register = {}
    
    constructor(private http: HttpClient, private router: Router){}
    
    signUp(email:String, password:String, userType:String){
        this.Register = {
            email: email,
            password: password,
            userType: userType
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

    
    getAcountType(user:String, password:String){
        this.User = {
            user: user,
            password: password
        }
        return this.http.post<any>(this.url + '/acounttype',this.User);
    }

    getUserId(user:String, password:String){
        this.User = {
            user: user,
            password: password
        }
        return this.http.post<any>(this.url + '/userid',this.User);
    }

    loggedIn(){
        return !!localStorage.getItem('token');
    }

    getToken(){
        return localStorage.getItem('token');
    }

    logOut(){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}