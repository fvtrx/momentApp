import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController} from 'ionic-angular';
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

  constructor( private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams, public app: App, public auth: AuthService, public alertCtrl: AlertController) { }

    ionViewWillLoad() {
      this.afAuth.authState.subscribe(data => {
        if (data.email && data.uid) {
          let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Login successful.',
            buttons: ['OK']
          });
          alert.present();

          this.userData = this.afDatabase.object(`user/${data.uid}`).valueChanges();

        }
        // else {
        //   this.toastCtrl.create({
        //     message: `Could not find authentication details`,
        //     duration: 3000
        //   }).present();
        //   this.navCtrl.push(LoginPage);
        // }
      })
    }

    logOut(): void {
      const logout = this.auth.logOutUser().then( () => {
        if (logout) {
          let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'You have been logout from Moment',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot(LoginPage);
        }
      });

      // if (logout) {
      //   let alert = this.alertCtrl.create({
      //     title: 'Success!',
      //     subTitle: 'Your account has been created. Login now',
      //     buttons: ['OK']
      //   });
      //   alert.present();
      //   this.navCtrl.push(LoginPage);
      // }
    }

    getEmail(){
      return this.user && this.user.email;
    }

    profilePage() {
      this.navCtrl.push(ProfilePage);
    }



}
