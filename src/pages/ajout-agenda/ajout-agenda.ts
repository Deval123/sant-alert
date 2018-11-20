import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Generated class for the AjoutAgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-agenda',
  templateUrl: 'ajout-agenda.html',
})
export class AjoutAgendaPage {

  @ViewChild("datedebut") datedebut;
  @ViewChild("datefin") datefin;
  @ViewChild("nature") nature;
  @ViewChild("lieu") lieu;
  @ViewChild("observation") observation;
  data:string;
  items:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {



  }///patients_id


  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutAgendaPage');
  }
  Ajouter(){
    //// check to confirm the username, email, telephone and password fields are filled


    if(this.datedebut.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date début field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.datefin.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date de fin field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.nature.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"nature field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    {


      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
      let data = {
        datedebut: this.datedebut.value,
        datefin: this.datefin.value,
        nature: this.nature.value,
        lieu: this.lieu.value,
        observation: this.observation.value,
        patients: JSON.parse(localStorage.getItem('patients')),

      };

      console.log(JSON.parse(localStorage.getItem('patients')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post("http://habitechsolution.com/devdb/insertAgendaPatients.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {

            loader.dismiss()
            if(res=="Successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
              //this.navCtrl.setRoot(SuiviPersoPage);

            }else
            {
              let alert = this.alertCtrl.create({
                title:"ERROR",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
            }
          });
      });
    }

  }
}
