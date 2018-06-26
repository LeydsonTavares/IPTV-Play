import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, AlertController, ToastController } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { Storage } from '@ionic/storage';


import { Canal } from './../../models/canal';
import { CanalProvider } from '../../providers';
import { User } from '../../providers';
import { FirstRunPage } from '..';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  listCanais: Canal[] = [];

  constructor(public navCtrl: NavController,
    public storage: Storage,
    public user: User,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public canalProvider: CanalProvider,
    public alertCtrl: AlertController,
    public streamingMedia: StreamingMedia) {
    this.findAllCanais();
  }


  findAllCanais() {
    this.canalProvider.findAll()
      .subscribe(response => {
        this.listCanais = response;
        this.storage.set("CANAIS", response);
      },
        error => {
          let alert = this.alertCtrl.create({
            title: 'Que pena!',
            message: 'A comunicação com o servidor falhou, verifique sua Lista Off-line',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: 'Lista Off-line?',
                handler: () => {
                  this.storage.get('CANAIS').then((data) => {
                    console.log("Data", data);
                    this.listCanais = data;
                    let toast = this.toastCtrl.create({
                      message: 'Lista de Canais Off-line!',
                      duration: 3000,
                      position: 'top'
                    });
                    toast.present();
                  });
                }
              }
            ]
          });
          alert.present();
        });
  }

  itemTapped(event, canal) {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape'
    };

    this.streamingMedia.playVideo(canal.iptv, options);

  }

  getItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.listCanais = this.listCanais.filter((canal) => {
        return (canal.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.findAllCanais();
    }
  }

  doLogout() {
    this.user.logout();
    this.navCtrl.push(FirstRunPage);
    this.storage.clear();
  }
}
