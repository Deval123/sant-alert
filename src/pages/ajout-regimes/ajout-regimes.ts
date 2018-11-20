import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Generated class for the AjoutRegimesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-regimes',
  templateUrl: 'ajout-regimes.html',
})
export class AjoutRegimesPage {

  @ViewChild("type_regime") type_regime;
  @ViewChild("datedebut") datedebut;
  @ViewChild("poidsDepart") poidsDepart;
  @ViewChild("imc") imc;
  @ViewChild("restrictions") restrictions;
  @ViewChild("taille") taille;
  @ViewChild("natureRegime") natureRegime;
  @ViewChild("alimentationRecommande") alimentationRecommande;
  @ViewChild("typeTraitement") typeTraitement;
  @ViewChild("dateFin") dateFin;
  data:string;
  items:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutRegimesPage');
  }
  //						patients_id

  Ajouter(){


    if(this.type_regime.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"type regime  field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.datedebut.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date debut field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.poidsDepart.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"poidsDepart  field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.taille.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"taille field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.restrictions.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"restrictions field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.natureRegime.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"nature Regime field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.alimentationRecommande.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"alimentation Recommande field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.imc.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"imc field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.typeTraitement.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Type traitement field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.dateFin.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"dateFin field is empty",
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
 //						patients_id

      let data = {
        //nom: JSON.parse(localStorage.getItem('username')),
        //password: JSON.parse(localStorage.getItem('password')),
        type_regime: this.type_regime.value,
        datedebut: this.datedebut.value,
        poidsDepart: this.poidsDepart.value,
        taille: this.taille.value,
        restrictions: this.restrictions.value,
        natureRegime: this.natureRegime.value,
        alimentationRecommande: this.alimentationRecommande.value,
        imc: this.imc.value,
        typeTraitement: this.typeTraitement.value,
        dateFin: this.dateFin.value,
        patients: JSON.parse(localStorage.getItem('patients')),

      };

      console.log(JSON.parse(localStorage.getItem('patients')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post("http://habitechsolution.com/devdb/insertRegimes.php",data, options)
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
