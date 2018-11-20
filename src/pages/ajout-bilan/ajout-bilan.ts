import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Generated class for the AjoutBilanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-bilan',
  templateUrl: 'ajout-bilan.html',
})
export class AjoutBilanPage {
  @ViewChild("dateCreate") dateCreate;
  @ViewChild("intitule") intitule;
  @ViewChild("temperature") temperature;
  @ViewChild("taille") taille;
  @ViewChild("tension") tension;
  @ViewChild("poidsActuel") poidsActuel;
  @ViewChild("poidsNormal") poidsNormal;
  @ViewChild("imc") imc;
  @ViewChild("tgc") tgc;
  @ViewChild("masseMinEraleOsseuse") masseMinEraleOsseuse;
  @ViewChild("pourcentageEau") pourcentageEau;
  @ViewChild("masseMusculaire") masseMusculaire;
  @ViewChild("evaluationSihouette") evaluationSihouette;
  @ViewChild("tgViscerale") tgViscerale;
  data:string;
  items:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutBilanPage');
  }

  Ajouter(){


    if(this.dateCreate.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date create field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.intitule.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"intitule field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.temperature.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"temperature  field is empty",
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
    if(this.tension.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"tension field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.poidsActuel.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"poidsActuel field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.poidsNormal.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"poidsNormal field is empty",
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
    if(this.tgc.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"tgc field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.masseMinEraleOsseuse.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"masseMinEraleOsseuse field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.pourcentageEau.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"pourcentageEau field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.masseMusculaire.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"masseMusculaire field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.evaluationSihouette.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"evaluationSihouette field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.tgViscerale.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"tgViscerale field is empty",
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
      //					patients_id
      let data = {
        //nom: JSON.parse(localStorage.getItem('username')),
        //password: JSON.parse(localStorage.getItem('password')),
        datecreate: this.dateCreate.value,
        intitule: this.intitule.value,
        temperature: this.temperature.value,
        taille: this.taille.value,
        tension: this.tension.value,
        poidsActuel: this.poidsActuel.value,
        poidsNormal: this.poidsNormal.value,
        imc: this.imc.value,
        tgc: this.tgc.value,
        masseMinEraleOsseuse: this.masseMinEraleOsseuse.value,
        pourcentageEau: this.pourcentageEau.value,
        masseMusculaire: this.masseMusculaire.value,
        evaluationSihouette: this.evaluationSihouette.value,
        tgViscerale: this.tgViscerale.value,
        patients: JSON.parse(localStorage.getItem('patients')),

      };

      console.log(JSON.parse(localStorage.getItem('patients')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post("http://habitechsolution.com/devdb/insertBilan.php",data, options)
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
