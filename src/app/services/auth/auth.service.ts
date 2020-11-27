import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import "firebase/auth";

@Injectable()
export class AuthService {
  googleProvider = new firebase.auth.GoogleAuthProvider();
  facebookProvider = new firebase.auth.FacebookAuthProvider();
  
  constructor(public afAuth: AngularFireAuth) { }

  async loginGoogle(){
    try {
      return this.afAuth.signInWithPopup(this.googleProvider);
    }
    catch (error){ console.log(error); }
  }

  async loginFacebook(){
    try {
      return this.afAuth.signInWithPopup(this.facebookProvider);
    }
    catch (error){ console.log(error); }
  }


  async resetPassword(email: string):Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    }
    catch(error){
      console.log(error);
      
    }
  }

  async sendVerificationEmail(): Promise<void>{
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email, 
        password
        );
        return result;
    } catch (error) {
      console.log(error);
    }
  }
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email, 
        password
        );
        this.sendVerificationEmail();
        return result;
    }catch (error) {
      console.log(error);
      window.alert(error.message);
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

}
