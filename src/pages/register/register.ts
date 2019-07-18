import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { AngularFireAuth  } from "angularfire2/auth";
import { User } from '../../models/user';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor( private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,
      user.password);
      if (result) {
          let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Your account has been created. Login now',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(LoginPage);
      }
    }
    catch (e) {
      if (e) {
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Please enter your details and try again.',
          buttons: ['OK']
        });
        alert.present();
      }
    }
  }

}
