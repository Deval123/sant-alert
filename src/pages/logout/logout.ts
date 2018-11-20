import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HomePage } from '../home/home';


/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {

    this.events.publish('user:loggedout');
    localStorage.clear();
    //setTimeout(() => this.backToWelcome(), 1000);
    this.navCtrl.setRoot(HomePage);

  }

/*  backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }*/


  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
