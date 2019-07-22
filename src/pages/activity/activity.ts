import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Bookings } from "../../models/bookings";
import { BookingDetailsService } from '../../providers/booking-details/booking-details.service';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service/auth.service';


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

  constructor(public navCtrl: NavController, public navParams: NavParams,private bookings: BookingDetailsService,
  private alertCtrl: AlertController, private auth: AuthService)
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



 logOut(): void {
  this.auth.logOutUser().then( response => {
      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'You have been logout from Moment',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.setRoot(LoginPage);
  });
 }

}
