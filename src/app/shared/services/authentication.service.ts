import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/User";
import {GlobalsService} from "./globals.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedInVar: boolean = false;
  isAdminVar: boolean = false;

  constructor(private http: HttpClient, private globalsService: GlobalsService) {
    this.update();
  }

  update() {
    this.isLoggedIn().subscribe({
      next: isLoggedIn => {
        this.isLoggedInVar = isLoggedIn;
        if (this.isLoggedInVar) {
          this.isAdmin().subscribe({
            next: (isAdmin) => {
              this.isAdminVar = isAdmin;
            }, error: (err) => {
              console.log(err);
            }
          });
        } else {
          this.isAdminVar = false;
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  login(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<User>(`${this.globalsService.serverURI}/login`, body, { headers: headers, withCredentials: true });
  }

  register(user: User) {
    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('email', user.email);
    body.set('name', user.name);
    body.set('address', user.address);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.globalsService.serverURI}/register`, body, { headers: headers, withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.globalsService.serverURI}/logout`, {}, { withCredentials: true, responseType: 'text' });
  }

  isLoggedIn() {
    return this.http.get<boolean>(`${this.globalsService.serverURI}/isLoggedIn`, { withCredentials: true });
  }

  isAdmin() {
    return this.http.get<boolean>(`${this.globalsService.serverURI}/isAdmin`, { withCredentials: true });
  }

  getUser() {
    return this.http.get<User>(`${this.globalsService.serverURI}/getUser`, { withCredentials: true });
  }

  updateUser(user: User) {
    const body = new URLSearchParams();
    if (user.username) {
      body.set('username', user.username);
    }
    body.set('name', user.name);
    body.set('address', user.address);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.globalsService.serverURI}/updateUser`, body, { headers: headers, withCredentials: true });
  }

  deleteUser() {
    return this.http.delete(`${this.globalsService.serverURI}/deleteUser`, { withCredentials: true });
  }

  initUsers() {
    return this.http.post(`${this.globalsService.serverURI}/initUsers`, {});
  }
}
