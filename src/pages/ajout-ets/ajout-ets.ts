import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
/*import 'rxjs/add/operator/map';*/
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuiviPersoPage } from '../suivi-perso/suivi-perso';
import { HomePersonnelPage } from '../home-personnel/home-personnel';
/**
 * Generated class for the AjoutEtsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-ets',
  templateUrl: 'ajout-ets.html',
})
export class AjoutEtsPage {

  items:any;
  @ViewChild("statut") statut;
  @ViewChild("nom") nom;
  @ViewChild("ville") ville;
  @ViewChild("telephone") telephone;
  @ViewChild("email") email;
  @ViewChild("type") type;
  @ViewChild("adresse") adresse;
  @ViewChild("code") code;

///statut, nom, code, telephone, email, type, adresse,ville
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,  private http: Http,
              public loading: LoadingController) {

  }

  Register(){
    //// check to confirm the username, email, telephone and password fields are filled

    if(this.statut.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Username field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.nom.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Email field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.ville.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Mobile number field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.telephone.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"firstname name field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.email.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Password field is empty",
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
        statut: this.statut.value,
        nom: this.nom.value,
        code: this.code.value,
        email: this.email.value,
        telephone: this.telephone.value,
        type: this.type.value,
        adresse: this.adresse.value,
        ville: this.ville.value
      };



      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post("http://habitechsolution.com/devdb/insertEts.php",data, options)
          //.map(res => JSON.stringify(data))
          .pipe(map((res: any) => res.json()))
          //.pipe(map((res: any) => res.json()))
          .subscribe(res => {

            loader.dismiss()
            if(res=="Registration successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
              this.navCtrl.setRoot(SuiviPersoPage);

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutEtsPage');
  }

}
