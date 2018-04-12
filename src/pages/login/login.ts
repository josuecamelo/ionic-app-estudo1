import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {ProductsPage} from "../products/products";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {
    email: 'user@user.com',
    password: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.http.post<any>('http://localhost:8000/api/login', this.user)
        .subscribe(data => {
          window.localStorage.setItem('token', data.token);
          this.navCtrl.setRoot(ProductsPage)
        });
  }

}
