import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';

// import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
// import { RegisterPage } from '../pages/register/register';
import { AuthService } from '../providers/auth-service/auth.service';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
// import { Observable } from 'rxjs';
// import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // userData: Observable<any>

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  menu: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private auth: AuthService, public app: App
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: ProfilePage }
    ];

  }

  showSplash = true; // <-- show animation

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();  // <-- hide static image

      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s

      this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = TabsPage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  login() {
    this.menu.close();
    this.auth.logOutUser();
    this.nav.setRoot(LoginPage);
  }

  // logOutUser() {
  //   const root = this.app.getRootNav();
  //   root.popToRoot();
  // }
}
