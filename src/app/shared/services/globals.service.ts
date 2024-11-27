import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  serverHost: string = environment.SERVER_HOST || 'localhost';
  serverPort: string = environment.SERVER_PORT || '5000';
  build: string = environment.BUILD || 'dev';

  serverURI: string=`http://${this.serverHost}:${this.serverPort}/${this.build}/app`;
}
