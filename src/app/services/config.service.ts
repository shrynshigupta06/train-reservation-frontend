import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<any> {
    return this.http
      .get('assets/app-config.json')
      .toPromise()
      .then((config: any) => {
        this.config = config;
      });
  }

  getConfig(): any {
    return this.config;
  }

}