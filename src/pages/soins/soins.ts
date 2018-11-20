import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { AjoutSoinsPage } from '../ajout-soins/ajout-soins';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


/**
 * Generated class for the SoinsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-soins',
  templateUrl: 'soins.html',
})
export class SoinsPage {
//datecreate	symtome	traitement	evaluation	observation	cout_traitement	patients_id
  @ViewChild("datecreate") datecreate;
  @ViewChild("symtome") symtome;
  @ViewChild("traitement") traitement;
  @ViewChild("evaluation") evaluation;
  @ViewChild("observation") observation;
  @ViewChild("cout_traitement") cout_traitement;
  data:string;
  items:any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoinsPage');
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
      this.http.post('http://habitechsolution.com/devdb/showAuto_med.php',data, options)
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
          localStorage.setItem('auto_med', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }

  deleteAuto_med(id){
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
      this.http.post('http://habitechsolution.com/devdb/deleteAuto_med.php',data, options)
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
    this.navCtrl.setRoot(AjoutSoinsPage);
  }
}
