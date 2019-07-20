import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Bookings } from '../../models/bookings';

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

  bookings = {} as Bookings;

  date_today;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.date_today = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  // showDatePicker() {
  //     this.datePicker.show({
  //     date: new Date(),
  //     mode: 'date',
  //     androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  //   }).then(
  //     date => console.log('Got date: ', date),
  //     err => console.log('Error occurred while getting date: ', err)
  //   );
  // }


}
