import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../auth.services';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor (private authService: AuthService, private router: Router){}

  ngOnInit(){

    localStorage.setItem('validar', "si")
 
  }

  logIn(form: NgForm){
    
    if(form.invalid){
      alert("No ingreso datos");
      return;
    }

    this.authService.logIn(form.value.nombre, form.value.password).subscribe( res =>{
      console.log(res)
      
      localStorage.setItem('token', res.token);
      localStorage.removeItem('validar');
      this.router.navigate(['/main']);

      setTimeout(() => {
        location.reload();
      }, 2000);

    },
    err =>{
      console.log(err)
    })
  }

  logTypeIn(form: NgForm){
    this.authService.getAcountType(form.value.nombre, form.value.password).subscribe( res =>{
      console.log(res)
      localStorage.setItem('usertype', JSON.stringify(res.type));
    },
    err =>{
      console.log(err)
    })
  }

  logIdIn(form: NgForm){
    this.authService.getUserId(form.value.nombre, form.value.password).subscribe( res =>{
      console.log(res)

      
      localStorage.setItem('userid', res.id);
      localStorage.setItem('usuario', res.nom);
      localStorage.setItem('gmail', res.gmail);

    },
    err =>{
      console.log(err)
      alert("usuario no existente")
      form.resetForm();
    })
  }

  generatePDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
    const documentDefinition = {
      content: [
        '¡Hola, este es un PDF simple creado con pdfmake en Angular!'
      ]
    };

    pdfMake.createPdf(documentDefinition).download('simple-pdf.pdf');
  }
}
