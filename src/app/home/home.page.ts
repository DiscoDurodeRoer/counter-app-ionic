import { Component } from '@angular/core';
import { IonHeader, IonContent, IonFooter, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronUpOutline, chevronDownOutline } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonContent,
    IonFooter,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonText
  ],
  providers: [
    AlertController
  ]
})
export class HomePage {

  public num: number;
  public MAX: number;
  public MIN: number;
  private KEY_NUMBER: string;

  constructor(private alertController: AlertController) {
    this.num = 0;
    this.MAX = 9999;
    this.MIN = 0;
    this.KEY_NUMBER = 'key_number';
    addIcons({
      chevronUpOutline,
      chevronDownOutline
    })
  }

  async ionViewWillEnter() {

    const counter = await Preferences.get({ key: this.KEY_NUMBER });

    if (counter.value) {
      const num = +counter.value;
      if (isNaN(num) || num < this.MIN || num > this.MAX) {
        this.num = this.MIN;
        this.saveNum();
      } else {
        this.num = num;
      }
    }

  }

  up() {
    if (this.num < this.MAX) {
      this.num++;
      this.saveNum();
    }
  }

  down() {
    if (this.num > this.MIN) {
      this.num--;
      this.saveNum();
    }
  }

  async reset() {

    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Quieres resetear el contador?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.num = 0;
            this.saveNum();
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });

    await alert.present();

  }

  private saveNum() {
    Preferences.set({ key: this.KEY_NUMBER, value: this.num.toString() })
  }

}
