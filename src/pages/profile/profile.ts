import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  items:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {


  }

 /* public set(settingName,value){
    return this.storage.set(`setting:${ settingName }`,JSON.stringify(value));
    //return localStorage.setItem('setting:${ settingName }', JSON.stringify(value));
  }
*/
  ionViewDidLoad() {

    console.log('Your name is');

  }
  ngOnInit(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    let data = {
      nom: JSON.parse(localStorage.getItem('username')),
      password: JSON.parse(localStorage.getItem('password')),

    };
    console.log(data);
    loader.present().then(() => {
      this.http.post('http://habitechsolution.com/devdb/show_users.php',data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss()


           /* let alert = this.alertCtrl.create({
              title:"CONGRATS",
              subTitle:(res),
              buttons: ['OK']
            });
            alert.present(); //  this.navCtrl.push(SuiviPersoPage, data);
         */
            this.items=res.server_response;
          localStorage.setItem('patients', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }
}
