import { Component } from '@angular/core';
import { NavController, NavParams, ToastController , App} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service/auth.service';
import { ProfilePage } from '../profile/profile';
import { AngularFireDatabase} from 'angularfire2/database';
// import { User } from '../../models/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData: Observable<any>

  private user: firebase.User;

  constructor( private afAuth: AngularFireAuth, private toastCtrl: ToastController, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams, public app: App, public auth: AuthService) { }

    ionViewWillLoad() {
      this.afAuth.authState.subscribe(data => {
        if (data.email && data.uid) {
          this.toastCtrl.create({
            message: `${data.email} successfully logged in.`,
            duration: 3000
          }).present();

          this.userData = this.afDatabase.object(`user/${data.uid}`).valueChanges();

        }
        else {
          this.toastCtrl.create({
            message: `Could not find authentication details`,
            duration: 3000
          }).present();
          this.navCtrl.push(LoginPage);
        }
      })
    }

    logout() {
      const root = this.app.getRootNav();
      root.popToRoot(LoginPage);
    }

    getEmail(){
      return this.user && this.user.email;
    }

    profilePage() {
      this.navCtrl.push(ProfilePage);
    }



}
