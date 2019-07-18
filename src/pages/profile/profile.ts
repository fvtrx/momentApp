import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth.service';
import { Observable } from 'rxjs';
// import { AuthService } from '../../providers/auth-service/auth.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {} as User;
  userData: Observable<any>

  private User: firebase.User;

  constructor( private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private auth: AuthService,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  async updateProfile() {
    try {
      const update = await this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`user/${auth.uid}`).set(this.user)
      });
      if (update) {
          let alert = this.alertCtrl.create({
            title: 'Updated!',
            subTitle: 'Profile has been updated',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot(HomePage);
      }
      //  this.userData = this.afDatabase.object(`user/${data.uid}`).valueChanges();
    }
    catch (e) {
      if (e) {
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Profile is not updated.',
          buttons: ['OK']
        });
        alert.present();
      }
    }
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
        if (data.email && data.uid) {
          this.userData = this.afDatabase.object(`user/${data.uid}`).valueChanges();
        }
        else {
          console.log('error');
        }
    })
  }

  // getName() {
  //   this.afAuth.authState.subscribe(data => {
  //     if (data.email && data.uid) {
  //       this.userData = this.afDatabase.object(`user/${data.uid}`).valueChanges();
  //     }
  //     // else {
  //     //   let alert = this.alertCtrl.create({
  //     //     title: 'Error!',
  //     //     subTitle: 'Profile is not updated.',
  //     //     buttons: ['OK']
  //     //   });
  //     //   alert.present();
  //     // }
  //   })
  // }

  getEmail() {
    return this.user && this.user.email;
  }

}
