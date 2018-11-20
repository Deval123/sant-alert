import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { AjoutRegimesPage } from '../ajout-regimes/ajout-regimes';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Generated class for the RegimesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regimes',
  templateUrl: 'regimes.html',
})
export class RegimesPage {
  data:string;
  items:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegimesPage');
  }

  ngOnInit(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data = {
      patients: JSON.parse(localStorage.getItem('patients')),
    };
    let loader = this.loading.create({
      content: 'Processing please wait...',
    });

    console.log(data);
    loader.present().then(() => {
      this.http.post('http://habitechsolution.com/devdb/showRegime.php',data, options)
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
          //localStorage.setItem('auto_med', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }


  deleteRegime(id){
    id=id;
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data = {
      id: id,
    };
    let loader = this.loading.create({
      content: 'Processing please wait...',
    });

    console.log(data);
    loader.present().then(() => {
      this.http.post('http://habitechsolution.com/devdb/deleteRegime.php',data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss()
          let alert = this.alertCtrl.create({
            title:"CONGRATS",
            subTitle:(res),
            buttons: ['OK']
          });
          alert.present();
          //this.navCtrl.push(SuiviPersoPage);

          //this.items=res.server_response;
          //localStorage.setItem('auto_med', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }


  addautomed(){
    let alert = this.alertCtrl.create({
      title:"Ajouter ?",
      subTitle:"confirmé l'ajout",
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(AjoutRegimesPage);
  }
}
