import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class User {
  _user: any;

  constructor(private angularFireAuth: AngularFireAuth) { }


  login(email: string, password: string): any {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string): any {
    return this.angularFireAuth.auth
  .createUserWithEmailAndPassword(email, password);
  }
 
  logout(): any {
    this.angularFireAuth.auth.signOut();
  }

  _loggedIn(resp) {
    this._user = resp.user;
  }
}
