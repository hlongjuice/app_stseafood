import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, Events, App, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';

import { HomePage } from "../pages/home/home";
import { AuthService } from "../services/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  /*Page*/
  // rootPage=HomePage;
  // rootPage:'LoginPage';
  // rootPage = 'LoginPage';
  rootPage:string;
  homePage = HomePage

  /* End QC */
  private authState: boolean;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    http: Http,
    private menuCtrl: MenuController,
    private screenOrientation: ScreenOrientation,
    private authService: AuthService,
    public eventCtrl: Events,
    public appCtrl: App,
    public storage:Storage,
    public modalCtrl:ModalController
    // private screenOrientation: ScreenOrientation
  ) {
    this.authState = false;
    this.eventCtrl.subscribe('logout', () => {
      this.nav.setRoot('LoginPage');
    })
    this.eventCtrl.subscribe('after:login', () => {
      console.log('Joined')
    })
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
  ngOnInit() {
    this.rootPage='LoginPage';
   /* console.log('App Component')
    this.storage.get('token')
      .then(token => {
        console.log(token)
        if (token != null) {
          this.authService.setAuth(token)
            .then(result => {
              this.nav.setRoot(this.homePage)
            }).catch(err => { 
              console.log(err); 
              this.rootPage='LoginPage'
            })
        }
      })*/
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.authState = this.authService.getAuthState();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    console.log(this.menuCtrl.getMenus());
    this.menuCtrl.enable(false, 'masterMenu');
    this.menuCtrl.enable(false, 'productionMenu');
    this.menuCtrl.enable(false, 'humanResourceMenu');
  }
  openPage(page: any) {
    this.nav.setRoot(page);
    // this.appCtrl.getRootNav().setRoot(page);
    this.menuCtrl.close();
  }
  logout() {
    this.authService.logout()
      .then(result => {
        console.log(result)
        // this.nav.setRoot(this.loginPage);
        console.log('Log Out');
      })
  }
  
  openModal(page){
    let modal=this.modalCtrl.create(page);
    modal.present();
  }
}
