import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Generated class for the AjoutSoinsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-soins',
  templateUrl: 'ajout-soins.html',
})
export class AjoutSoinsPage {

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
    console.log('ionViewDidLoad AjoutSoinsPage');
  }


  Ajouter(){
    //// check to confirm the username, email, telephone and password fields are filled


    if(this.datecreate.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date create field is empty",
        buttons: ['OK']
      });

      alert.present();
    } else
    if(this.symtome.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Email field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.traitement.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"traitement number field is empty",
        buttons: ['OK']
      });

      alert.present();
    }  else
    if(this.evaluation.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"evaluation name field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else //		cout_traitement	patients_id
    if(this.observation.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"observation field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.cout_traitement.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"cout_traitement field is empty",
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
//datecreate	symtome	traitement	evaluation	observation	cout_traitement	patients_id
      let data = {
       //nom: JSON.parse(localStorage.getItem('username')),
        //password: JSON.parse(localStorage.getItem('password')),
        datecreate: this.datecreate.value,
        symtome: this.symtome.value,
        traitement: this.traitement.value,
        evaluation: this.evaluation.value,
        observation: this.observation.value,
        cout_traitement: this.cout_traitement.value,
        patients: JSON.parse(localStorage.getItem('patients')),

      };

     console.log(JSON.parse(localStorage.getItem('patients')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post("http://habitechsolution.com/devdb/insertSoins.php",data, options)
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
