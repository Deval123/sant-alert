import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { AjoutAgendaPage } from '../ajout-agenda/ajout-agenda';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Generated class for the AgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  data:string;
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');
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
      this.http.post('http://habitechsolution.com/devdb/showAgendaPatients.php',data, options)
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
          localStorage.setItem('AgendaPatients', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }

  deleteAgendaPatients(id){
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
      this.http.post('http://habitechsolution.com/devdb/deleteAgendaPatients.php',data, options)
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

  addAgendaPatients(){
    let alert = this.alertCtrl.create({
      title:"Ajouter ?",
      subTitle:"confirmé l'ajout",
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(AjoutAgendaPage);
  }
}
