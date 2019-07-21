import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Bookings } from "../../models/bookings";



@Injectable()
export class BookingDetailsService {

  private bookingDetailsRef = this.db.list<Bookings>('booking-details');

  constructor(private db: AngularFireDatabase){

  }

  getBookingDetails() {
    return this.bookingDetailsRef;
  }

  makeBooking (bookings: Bookings) {
    return this.bookingDetailsRef.push(bookings);
  }

}
