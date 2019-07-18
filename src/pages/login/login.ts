import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
// import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
// import { AngularFireAuth } from "angularfire2/auth";
// import { HomePage } from '../home/home';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth.service';
import { TabsPage } from '../tabs/tabs';

@IonicPage({
  name: 'login'
}
)
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginError: string;

  // user = {} as User;

  constructor( private auth: AuthService,
    public navCtrl: NavController, public navParams: NavParams,
    fb: FormBuilder, public alertCtrl: AlertController) {

    this.loginForm = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  login() {
    try{
      let data = this.loginForm.value;

      if (!data.email) {
        return;
      }

      let credentials = {
        email: data.email,
        password: data.password
      };

      this.auth.signInWithEmail(credentials)
        .then(
          () => this.navCtrl.setRoot(TabsPage),
          error => this.loginError = error.message,
      );
      this.navCtrl.setRoot(TabsPage);
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

  // async login(user: User) {
  //   try{
  //     const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
  //     if (result) {
  //       this.navCtrl.setRoot(HomePage);
  //     }
  //   }
  //   catch (e) {
  //     if (e) {
  //       let alert = this.alertCtrl.create({
  //         title: 'Error!',
  //         subTitle: 'Please enter your details and try again.',
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //     }
  //   }

  // }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
