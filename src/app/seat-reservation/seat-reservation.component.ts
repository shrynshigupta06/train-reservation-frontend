import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.scss']
})

export class SeatReservationComponent implements OnInit {

  seatsAvailable: number = 0;
  numSeats: number = 0;
  reservedSeats: string[] = [];
  seatForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.seatForm = this.formBuilder.group({
      numSeats: [{value: this.numSeats}, [Validators.required, Validators.min(1), Validators.max(7)]],
    });

    this.seatForm.controls['numSeats'].valueChanges.subscribe((value) => {
      this.numSeats = value;
    });

    this.getSeatAvailability();
  }

  getSeatAvailability(): void {
    this.reservationService.getSeatAvailability().subscribe(
      (seats) => {
        this.seatsAvailable = seats.filter((seat: any) => !seat.isReserved).length;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  reserveSeats(): void {
    const reservationData = { numSeats: this.numSeats };
    this.reservationService.reserveSeats(reservationData).subscribe(
      (response) => {
        this.reservedSeats = response.seatNumbers;
        this.getSeatAvailability();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
