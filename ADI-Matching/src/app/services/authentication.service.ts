import { Inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged, signOut, getRedirectResult, UserCredential } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, sendSignInLinkToEmail } from 'firebase/auth';
import { Router } from '@angular/router';
import { LocalstoreService } from './localstore.service';
import { IUser } from '../interfaces/user';
import { UserService } from './user.service';
Inject
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  googeProvider = new GoogleAuthProvider();
  facebookProvider = new FacebookAuthProvider();
  constructor(
    private auth: Auth, 
    private route: Router,
     private localStore: LocalstoreService,
    // @Inject(String) private userCredential:UserCredential,
     ) { }
  actionCodeSettings = {
    url: "https://simple-inventory-9c8e8.web.app/dashboard",
    handleCodeInApp: true,
  };
  signIn(user: IUser) {
    signInWithEmailAndPassword(this.auth, user.email, user.password)
      .then((result: any) => {
        sendSignInLinkToEmail(this.auth, user.email, this.actionCodeSettings)
          // if The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          .then(() => {
            this.localStore.set('emailForSignIn', user.email);
            console.log(user.email, "verified");
            this.localStore.set('User', {
              Name: user.Username,
              email: user?.email,
              // PhotoURL: user?.photoURL,
              loginStatus: true
            })

          }).catch((error) => {
            console.log(error.code, error.message);

          })

        onAuthStateChanged(this.auth, (user) => {
          this.localStore.set('User', {
            Name: user?.displayName,
            email: user?.email,
            PhotoURL: user?.photoURL,
            loginStatus: user?.emailVerified
          })
        })
        // this.route.navigate(['/dashboard']);
      }).catch((err: any) => {
        console.log(err.code);
        console.log(err.message);
      });
  }


  signOut() {
    signOut(this.auth).then(() => {
      onAuthStateChanged(this.auth, (user) => {
        this.localStore.set('User', {
          Name: user?.displayName,
          email: user?.email,
          PhotoURL: user?.photoURL,
          loginStatus: false
        })

      })
      this.route.navigate(["/sign-in"]);
      return
    }).catch((error) => {
      alert(error.code);
    })
  }
  signUp(user: IUser) {
    createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then((result) => {
        console.log('Registration successfull');
        this.route.navigate(['/sign-in']);
      }).catch((err) => {
        console.log(err.code);
      });

  }
  googleSignIn() {
    signInWithPopup(this.auth, this.googeProvider)
      .then((result) => {
        getRedirectResult(this.auth)
        .then(() => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.idToken;
          this.localStore.set("access Token",token);
          
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        })
        console.log(result.user);
        onAuthStateChanged(this.auth, (user) => {
          this.localStore.set('User', {
            Name: user?.displayName,
            email: user?.email,
            PhotoURL: user?.photoURL,
            loginStatus: user?.emailVerified
          })
        })
        this.route.navigate(["/uoai/home"]);
      }).catch((err) => {
        console.log(err.code);

      });

   
  }
  // userCredential(userCredential: any) {
  //   throw new Error('Method not implemented.');
  // }
  facebookSignIn() {
    signInWithPopup(this.auth, this.facebookProvider)
      .then((result) => {
        console.log(result.user);
        onAuthStateChanged(this.auth, (user) => {
          this.localStore.set('User', {
            Name: user?.displayName,
            email: user?.email,
            PhotoURL: user?.photoURL,
            loginStatus: user?.emailVerified
          })
        })
        this.route.navigate(['']);

      }).catch((err) => {
        console.log(err.code);
      });
  }
  
}