import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mobile } from '../model/Mobile';
import {GlobalsService} from "./globals.service";

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private http: HttpClient, private globalsService: GlobalsService) {

  }

  uploadMobile(mobile: Mobile) {
    const body = new URLSearchParams();
    body.set('name', mobile.name);
    body.set('modelName', mobile.modelName);
    body.set('company', mobile.company);
    body.set('picture', mobile.picture);
    body.set('price', mobile.price.toString());
    body.set('stock', mobile.stock.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.globalsService.serverURI}/uploadMobile`, body, { headers: headers, withCredentials: true });
  }

  getAll(search: string) {
    return this.http.get<Mobile[]>(`${this.globalsService.serverURI}/getAllMobiles/` + search);
  }

  getMobile(modelName: string) {
    return this.http.get<Mobile>(`${this.globalsService.serverURI}/getMobile/` + modelName);
  }

  deleteMobile(modelName: string) {
    return this.http.delete(`${this.globalsService.serverURI}/deleteMobile/` + modelName, {withCredentials: true});
  }

  initMobiles() {
    return this.http.post(`${this.globalsService.serverURI}/initMobiles`, {});
  }
}
