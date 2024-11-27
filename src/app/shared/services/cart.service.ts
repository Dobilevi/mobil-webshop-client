import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CartItem} from "../model/CartItem";
import {CartItem_Mobile} from "../model/CartItem_Mobile";
import {AuthenticationService} from "./authentication.service";
import {GlobalsService} from "./globals.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private globalsService: GlobalsService) {

  }

  getCart() {
    return this.http.get<CartItem_Mobile[]>(`${this.globalsService.serverURI}/getCart`, { withCredentials: true });
  }

  addToCart(modelName: string, quantity: number) {
    const body = new URLSearchParams();
    body.set('modelName', modelName);
    body.set('quantity', quantity.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.globalsService.serverURI}/addToCart`, body, { headers: headers, withCredentials: true });
  }

  removeFromCart(cartItem: CartItem) {
    const body = new URLSearchParams();
    body.set('userEmail', cartItem.userEmail);
    body.set('modelName', cartItem.modelName);
    body.set('quantity', cartItem.quantity.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.globalsService.serverURI}/removeFromCart`, body, { headers: headers, withCredentials: true });
  }

  purchase(cartItems: CartItem[]) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(`${this.globalsService.serverURI}/purchase`, {}, { headers: headers, withCredentials: true });
  }
}
