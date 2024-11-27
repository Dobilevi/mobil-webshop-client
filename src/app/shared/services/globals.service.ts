import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  serverHost: string = environment.SERVER_HOST || 'localhost';
  serverPort: string = environment.SERVER_PORT || '5000';

  serverURI: string=`https://${this.serverHost}:${this.serverPort}/app`;
}
