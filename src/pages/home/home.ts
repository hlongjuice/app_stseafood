import { DivisionService } from './../../services/division.service';
import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  homePage = HomePage;
  user: any;
  user_types: any;
  divisions: any;
  public name: any;
  constructor(
    private authService: AuthService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loaderCtrl: LoadingController,
    public divisionService: DivisionService
  ) {
  }

  ngOnInit() {
    let loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' });
    loader.present();
    this.authService.getUserDetails()
      .then(result => {

        this.user = result
        this.divisions = this.divisionService.getDivisionID();
        this.user_types = this.authService.getUserTypes();
        console.log(this.user, this.divisions, this.user_types)
        loader.dismiss();
      }).catch(err => {
        console.log(err);
        loader.dismiss();
      })
    // console.log(this.authService.getUser());
    //  token=this.authService.getToken()
    this.menuCtrl.enable(false, 'masterMenu');
    this.menuCtrl.enable(false, 'productionMenu');
    this.menuCtrl.enable(false, 'humanResourceMenu');
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
    this.menuCtrl.enable(true,'onlyHomeMenu');
    console.log('Yo!!');
  }
  openPage(page) {
    this.menuCtrl.enable(false, 'masterMenu');
    this.menuCtrl.enable(false, 'productionMenu');
    this.menuCtrl.enable(false, 'humanResourceMenu');
    this.menuCtrl.enable(false, 'qcMenu');
    this.menuCtrl.enable(false, 'engineerMenu');
    this.menuCtrl.enable(false, 'onlyHomeMenu');

    if (page == 'MainProductionPage') {
      this.menuCtrl.enable(true, 'productionMenu');
    } else if (page == 'MainHrPage') {
      this.menuCtrl.enable(true, 'humanResourceMenu');
    } else if (page == 'MainQcPage') {
      this.menuCtrl.enable(true, 'qcMenu');
    } else if (page == 'MainEngineerPage') {
      this.menuCtrl.enable(true, 'engineerMenu')
    } else if (page == 'RepairInvoicePage' || page == 'CarRequestPage'
      || page== 'CarResponsePage' ||page=='CarAccessControlPage') {
      this.menuCtrl.enable(true, 'onlyHomeMenu')
    }
    this.navCtrl.setRoot(page);
    this.menuCtrl.close();
  }

  //logout
  logout(){
    this.authService.logout()
    .then(result => {
      console.log(result)
      // this.nav.setRoot(this.loginPage);
      console.log('Log Out');
    })
  }
}
