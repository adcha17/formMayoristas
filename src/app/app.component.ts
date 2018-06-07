import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ContactModel } from './models/contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Contacto Mayorizta';

  contact = new ContactModel(null, null, null, null, null, null, null, null, null);

  /*--Fields--*/
  name = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('');
  businessName = new FormControl('');
  RUC = new FormControl('');
  categories = new FormControl('', [Validators.required]);
  products = new FormControl('', [Validators.required]);
  comment = new FormControl('');

  optionCategories = [
    {name: 'Hotel', value: 'Hotel'},
    {name: 'Restaurante', value: 'Restaurante'},
    {name: 'Catering', value: 'Catering'},
    {name: 'Otro', value: 'Otro'},
  ];

  optionProducts = [
    {name: 'Frutas', value: 'Frutas'},
    {name: 'Verduras', value: 'Verduras'},
    {name: 'Abarrotes', value: 'Abarrotes'},
    {name: 'Bebidas', value: 'Bebidas'},
    {name: 'Todos los anteriores', value: 'Todos los anteriores'},
    {name: 'Otros', value: 'Otros'},
  ];
  
  ngOnInit() {
  }

  private getErrorMessage(input) {
    if (input === 'name') {
      return this.name.hasError('required') ? 'Nombre es requerido.' : '';
    }
    if (input === 'lastname') {
      return this.lastname.hasError('required') ? 'Apellido es requerido.' : '';
    }
    if (input === 'email') {
      return this.email.hasError('required') ? 'Email es requerido.' : this.email.hasError('email') ? 'Email no válido.' :
        '';
    }
    if (input === 'categories') {
      return this.lastname.hasError('required') ? 'Apellido es requerido.' : '';
    }
    if (input === 'products') {
      return this.lastname.hasError('required') ? 'Apellido es requerido.' : '';
    }
  }
  private _postContact() {
  // private _postContact(categories, products) {
    // console.log(this.name.value);
    // console.log(categories);
    console.log('test');
  }
  private _postProduct($event, value) {
    console.log('_postProduct');
  }
  private _postCategory($event, value) {
    let valueCbox = '';
    if ($event.checked) {
      console.log(value);
      
    }
  }
}
