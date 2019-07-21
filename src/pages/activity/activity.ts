import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Bookings } from "../../models/bookings";
import { BookingDetailsService } from '../../providers/booking-details/booking-details.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {


  bookingLists$: Observable<Bookings[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,private bookings: BookingDetailsService)
  {
    this.bookingLists$ = this.bookings
    .getBookingDetails() //return Booking List
    .snapshotChanges()
    .map(
      changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val(),
      }));
    });
  }



  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ActivityPage');
  // }

}
