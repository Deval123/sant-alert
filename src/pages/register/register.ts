import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
/*import 'rxjs/add/operator/map';*/
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuiviPersoPage } from '../suivi-perso/suivi-perso';
import { HomePersonnelPage } from '../home-personnel/home-personnel';
//import 'rxjs'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  items:any;
  @ViewChild("email") email;
  @ViewChild("username") username;
  @ViewChild("mobile") mobile;
  @ViewChild("password") password;
  @ViewChild("firstname") firstname;
  @ViewChild("nom") nom;
  @ViewChild("matricule") matricule;
  @ViewChild("telephone") telephone;
  @ViewChild("emailpers") emailpers;
  @ViewChild("type_personnel") type_personnel;
  @ViewChild("passwordpers") passwordpers;
  @ViewChild("code") code;


  constructor(public navCtrl: NavController, public events: Events,public alertCtrl: AlertController,  private http: Http,
              public loading: LoadingController) {

  }

  Register(){
    //// check to confirm the username, email, telephone and password fields are filled

    if(this.username.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Username field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.email.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Email field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.mobile.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Mobile number field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.firstname.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"firstname name field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.password.value==""){

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
        username: this.username.value,
        password: this.password.value,
        mobile: this.mobile.value,
        email: this.email.value,
        firstname: this.firstname.value
      };


      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post("http://habitechsolution.com/devdb/register.php",data, options)
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
              this.events.publish('user:loggedin');
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

  Registerpersonnel(){
    ///etablissement_id		premon		email	type_personnel

   /* if(this.nom.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"nom field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.emailpers.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Email field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.telephone.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"telephone number field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.code.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"code etablissement field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.type_personnel.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"type personnel name field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.passwordpers.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Password field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    {
      let data = {
        nom: this.nom.value,
        passwordpers: this.passwordpers.value,
        telephone: this.telephone.value,
        emailpers: this.emailpers.value,
        type_personnel: this.type_personnel.value,
        matricule: this.matricule.value,
        code: this.code.value
      }
      localStorage.setItem('data', JSON.stringify(data));

      let code = {code: this.code.value}
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });


      let loader = this.loading.create({
        content: 'Processing please wait...',
      });


      loader.present().then(() => {
        this.http.post('http://habitechsolution.com/devdb/countEts.php',code, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {
            loader.dismiss()
            if(res=="Exist"){
              let loader = this.loading.create({
                content: 'Processing please wait...',
              });

                console.log(data);
                loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
                this.http.post("http://habitechsolution.com/devdb/insertPersonnel.php",data, options)
                  .pipe(map((res: any) => res.json))
                  .subscribe(res => {
                    loader.dismiss()
                    if(res=="Registration successfull"){
                      console.log(res);
                      let alert = this.alertCtrl.create({
                        title:"CONGRATS",
                        subTitle:(res),
                        buttons: ['OK']
                      });
                      console.log(res);
                      alert.present();
                      this.events.publish('user:loggedin');
                      this.navCtrl.setRoot(HomePersonnelPage);
                    }else
                    {
                      let alert = this.alertCtrl.create({
                        title:"ERROR",
                        subTitle:(res),
                        buttons: ['OK']
                      });
                      alert.present();
                      this.navCtrl.setRoot(RegisterPage);
                    }
                  });
              });
            }
            else{
              let alert = this.alertCtrl.create({
                title:"ERROR",
                subTitle:(res),
                buttons: ['OK']
              });
              alert.present();
              this.navCtrl.setRoot(RegisterPage);
            }

          });

      });




    }*/

    this.navCtrl.push(HomePersonnelPage);
  }
}
