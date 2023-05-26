import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatReservationComponent } from './seat-reservation/seat-reservation.component';

const routes: Routes = [{
  path: '',
  component: SeatReservationComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
