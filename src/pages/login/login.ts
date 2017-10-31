import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController, AlertController, App } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  homePage = HomePage;
  token:any;
  constructor(
    private menuCtrl: MenuController,
    private auth: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private appCtrl:App,
    private alertCtrl: AlertController,
    private storage:Storage,
    private eventCtrl:Events
  ) {
  }

  ngOnInit(){

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  /*LogIn Menu*/
  login(request: NgForm) {
    let loader = this.loadingCtrl.create({
      content: 'Loading.....'
    });
    loader.present()
      .then(
      () => {
        this.auth.login(request.value.username, request.value.password)
          .then(
          (data) => {
            loader.dismiss();
            this.navCtrl.setRoot(this.homePage);
            // this.appCtrl.getRootNav().setRoot(this.homePage);
          }
          )
          .catch(err => {
            loader.dismiss().then(
              () => {
                let alert = this.alertCtrl.create({
                  title: 'Login',
                  subTitle: 'username หรือ password ไม่ถูกต้อง',
                  buttons: ['Dismiss']
                });
                alert.present();
              }
            );

            console.log(err)
          });
      }
      )
  }


}
