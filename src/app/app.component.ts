import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ContactModel } from './models/contact.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import { environment } from '../environments/environment';


/* Service */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Contacto Mayorizta';

  contact = new ContactModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  categories: string;
  products: string;
  emptyCategories: boolean = false;
  emptyProducts: boolean = false;
  inputOtro: string;
  inputOtros: string;

  /*--Fields--*/
  name = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('');
  businessName = new FormControl('');
  RUC = new FormControl('');
  hotel = new FormControl('');
  restaurante = new FormControl('');
  catering = new FormControl('');
  limpieza = new FormControl('');
  otro = new FormControl('');
  frutas = new FormControl('');
  verduras = new FormControl('');
  abarrotes = new FormControl('');
  bebidas = new FormControl('');
  all = new FormControl('');
  otros = new FormControl('');
  comment = new FormControl('');

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  getErrorMessage(input) {
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
  }
  validateCheckboxs(): void {
    //validate input empty Categories
    if (this.hotel.value || this.restaurante.value || this.catering.value || this.limpieza.value || (this.otro.value && this.inputOtro)) {
      this.emptyCategories = false;
      this.generateCategories(this.hotel.value, this.restaurante.value, this.catering.value, this.limpieza.value, this.otro.value);
    } else {
      this.emptyCategories = true;
    }
    //validate input empty Products
    if (this.frutas.value || this.verduras.value || this.abarrotes.value || this.bebidas.value || this.all.value || (this.otros.value && this.inputOtros)) {
      this.emptyProducts = false;
      this.generateProducts(this.frutas.value, this.verduras.value, this.abarrotes.value, this.bebidas.value, this.all.value, this.otros.value);
    } else {
      this.emptyProducts = true;
    }
    // validate data for send mail
    if (this.name.value && this.lastname.value && this.email.value && !this.emptyCategories && !this.emptyProducts) {
      this.sendEmail(this.name.value, this.lastname.value, this.email.value, this.phone.value, this.businessName.value, this.RUC.value, this.categories, this.products, this.comment.value);
    }
  }
  sendEmail(name, lastname, email, phone, businessName, RUC, categories, products, comment) {
    let body = {
      name: name,
      lastname: lastname,
      email: email,
      telephone: phone,
      business_name: businessName,
      business_document: RUC,
      business_category: categories,
      product: products,
      comment: comment,
    }
    this.http.post(environment.api, body).subscribe(res => {
      this.thanksModal();
    },
      err => {
        console.error(err);
      }
    );
  }
  generateCategories(hotel, restaurante, catering, limpieza, otro) {
    let arrayCategories = [];
    if (hotel) {
      arrayCategories.push('hotel');
    }
    if (restaurante) {
      arrayCategories.push('restaurante');
    }
    if (catering) {
      arrayCategories.push('catering');
    }
    if (limpieza) {
      arrayCategories.push('limpieza');
    }
    if (otro && this.inputOtro) {
      arrayCategories.push(this.inputOtro);
    }
    this.categories = arrayCategories.join(', ');
  }
  generateProducts(frutas, verduras, abarrotes, bebidas, all, otros) {
    let arrayProducts = [];
    if (frutas) {
      arrayProducts.push('frutas');
    }
    if (verduras) {
      arrayProducts.push('verduras');
    }
    if (abarrotes) {
      arrayProducts.push('abarrotes');
    }
    if (otros && this.inputOtros) {
      arrayProducts.push(this.inputOtros);
    }
    if (all) {
      arrayProducts = []
      arrayProducts.push('frutas');
      arrayProducts.push('verduras');
      arrayProducts.push('abarrotes');
      arrayProducts.push('bebidas');
    }
    this.products = arrayProducts.join(', ');
  }
  thanksModal(): void {
    this.dialog.open(ModalComponent, {
      width: '300px'
    });
  }
}

@Component({
  selector: 'modalComponent',
  templateUrl: 'modal.component.html',
})
export class ModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}