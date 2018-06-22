import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Loading, LoadingController } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { User } from '../../providers';
import { LoginPage } from '../';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public signupForm: FormGroup;
  public loading: Loading;
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });
    this.signupForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['',Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  doSignup() {
    if (!this.signupForm.valid) {
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });

      toast.present();
    } else {
      this.user.signup(this.signupForm.value.email, this.signupForm.value.password).then((resp) => {
        this.loading.dismiss().then(() => {
          this.navCtrl.push(LoginPage);
        });
      }, (err) => {
        this.loading.dismiss().then(() => {
          let toast = this.toastCtrl.create({
            message: this.signupErrorString,
            duration: 3000,
            position: 'top'
          });

          toast.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
