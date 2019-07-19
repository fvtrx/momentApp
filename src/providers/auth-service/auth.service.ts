import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
// import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
       credentials.password);
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  getEmail() {
    return this.user && this.user.email;
  }

  logOutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }


}
