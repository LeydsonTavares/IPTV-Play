import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, Loading, NavController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { Storage } from '@ionic/storage';

import { User } from '../../providers';
import { MainPage } from '..';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private loginErrorString: string;
  public loginForm: FormGroup;
  public loading: Loading;




  constructor(public navCtrl: NavController,
    public user: User,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public formBuilder: FormBuilder) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
    this.loginForm = formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])],
      loadingStorage: [false,]
    });
  }




  updateStorage() {
    if (this.loginForm.value.loadingStorage != undefined) {
      if (this.loginForm.value.loadingStorage) {
        this.storage.set('EMAIL', this.loginForm.value.email);
        this.storage.set('PASSWORD', this.loginForm.value.password);
      }
      else {
        this.storage.clear();
      }
    }
  }


  doLogin(): void {
    if (!this.loginForm.valid) {
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      this.user.login(this.loginForm.value.email,
        this.loginForm.value.password).then((resp) => {
          this.loading.dismiss().then(() => {
            this.navCtrl.push(MainPage);
          });
        }, (err) => {
          this.loading.dismiss().then(() => {
            let toast = this.toastCtrl.create({
              message: this.loginErrorString,
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
