import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private appConfig: any;

  constructor(private http: HttpClient, private configService: ConfigService) { 
    this.appConfig = this.configService.getConfig();
  }

  getSeatAvailability() {
    return this.http.get<any>(`${this.appConfig.apiUrl}/seats`);
  }

  reserveSeats(reservationData: any) {
    return this.http.post<any>(`${this.appConfig.apiUrl}/reserve-seats`, reservationData);
  }
}
