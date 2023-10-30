import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (private authService: AuthService, private router: Router){}

  logIn(form: NgForm){
    if(form.invalid){
      alert("No ingreso datos");
      return;
    }
    this.authService.logIn(form.value.email, form.value.password).subscribe( res =>{
      console.log(res)
      localStorage.setItem('token', res.token);
      this.router.navigate(['/main']);
    },
    err =>{
      console.log(err)
    })
  }

  logTypeIn(form: NgForm){
    this.authService.getAcountType(form.value.email, form.value.password).subscribe( res =>{
      console.log(res)
      localStorage.setItem('usertype', JSON.stringify(res.type));
    },
    err =>{
      console.log(err)
    })
  }

  logIdIn(form: NgForm){
    this.authService.getUserId(form.value.email, form.value.password).subscribe( res =>{
      console.log(res)
      localStorage.setItem('userid', res.id);
    },
    err =>{
      console.log(err)
      alert("usuario no existente")
      form.resetForm();
    })
  }

}
