import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor (private authService: AuthService, private router: Router){}

  SignUp(form: NgForm){
    if(form.invalid){
      alert("Debes llenar los campos!")
      return
    }
    this.authService.signUp(form.value.email, form.value.password, "usuario").subscribe( res =>{
      console.log(res)
      localStorage.setItem('token', res.token);
      this.router.navigate(['/login']);
    },
    err =>{
      console.log(err)
    })
  }
}
