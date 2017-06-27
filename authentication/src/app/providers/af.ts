import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectFactoryOpts } from "angularfire2/interfaces";
import * as firebase from 'firebase/app';


@Injectable()
export class AF {
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public user;

  constructor(private afAuth: AngularFireAuth,private db: AngularFireDatabase) {
    afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = db.object('users/' + auth.uid);
        }
      });

    // this.messages = this.af.database.list('messages');
    // this.users = this.af.database.list('users');
  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (auth) => {
        let {uid,email,displayName} = auth.user;
        // let name = displayName;
        return {uid:uid,email:email,name:displayName}
      //  console.log('AUTH ',auth)
      })
  }

  /**
   * Logs out the current user
   */
  logout() {
    //return this.afAuth.auth.logout();
  }

  /**
   *
   */
  addUserInfo() {
    //We saved their auth info now save the rest to the db.
    this.users.push({
      email: this.email,
      displayName: this.displayName
    });
  }

  /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */
  sendMessage(text) {
    var message = {
      message: text,
      displayName: this.displayName,
      email: this.email,
      timestamp: Date.now()
    };
    this.messages.push(message);
  }

  /**
   *
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(user) {
    console.log(user)
    let {email, password} = user;
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
  .then((authState) => {
    console.log(authState);
    return authState;
  })
  .catch((error) => {
    console.log(error);
    throw error;
  });

  }

  /**
   *
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(userInfo) {
    return this.db.object('registeredUsers/' + userInfo.uid).set(userInfo);
  }

  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(user) {
    console.log(user)
    let { email,password } = user;
    console.log('email ',email,'password ',password)
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then((authState) => { 
      console.log('success', authState); 
      this.user = this.db.object('users/' + authState.uid);
      return authState
    })
    .catch((error) => { console.log('failure', error);  return error});
  }

}