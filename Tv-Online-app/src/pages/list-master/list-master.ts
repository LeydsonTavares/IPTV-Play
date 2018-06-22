import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController,AlertController } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';


import { Canal } from './../../models/canal';
import { CanalProvider } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  listCanais: Canal[] = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public canalProvider: CanalProvider,public alertCtrl: AlertController, public streamingMedia: StreamingMedia) {
    this.findAllCanais();
  }

 
  findAllCanais() {
    this.canalProvider.findAll()
      .subscribe(response => {
        this.listCanais = response;
        console.log("Canais", this.listCanais);
      },
        error => {
          let alert = this.alertCtrl.create({
            title: 'Que pena!',
            message: 'A comunicação com o servidor falhou, verifique sua conexão e tente novamente',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: 'Tentar novamente',
                handler: () => {
                  this.findAllCanais();
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





}
