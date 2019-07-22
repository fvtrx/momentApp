import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Bookings } from '../../models/bookings';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service/auth.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
// import { AngularFireDatabase } from 'angularfire2/database';
import { BookingDetailsService } from '../../providers/booking-details/booking-details.service';

/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  bookingForm: FormGroup;
  bookingError: string;

  bookingsDetails = {} as Bookings;
  date_today;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
  private auth: AuthService, fb: FormBuilder, private bookings: BookingDetailsService, private loadingCtrl: LoadingController)
  {
    this.bookingForm = fb.group({
      address: ['', Validators.compose([Validators.required])],
      streetName: ['', Validators.compose([Validators.required])],
      postCode: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      eventType: ['', Validators.compose([Validators.required])],
      eventDate: ['dd/mm/yyyy', Validators.compose([Validators.required])],
      mobileNumber: ['', Validators.compose([Validators.required])]
    });
    this.date_today = new Date().toISOString();
  }

  // ionViewWillLoad () {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   loading.present();
  //   setTimeout(() => {
  //     loading.dismiss();
  //   }, 5000);
  // }

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

   makeBooking (bookingsDetails: Bookings) {
    //
    const result = this.bookings.makeBooking(bookingsDetails).then(ref => {
      let loading = this.loadingCtrl.create({
          content: 'Please wait while we confirm your booking...'
        });
        loading.present();
        setTimeout(() => {
          if (result) {
            let alert = this.alertCtrl.create({
                title: 'Success!',
                subTitle: 'Booking has been made',
                buttons: ['OK']
              });
            alert.present();
          }
          loading.dismiss();
        }, 5000);
    })
  }
}
