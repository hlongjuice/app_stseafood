import { AuthService } from './../../services/auth.service';
import { PasswordService } from './../../services/password.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  _loader: any
  _toast: any
  _alert: any
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public passwordService: PasswordService,
    public authService: AuthService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController
  ) {
  }

  ngOnInit() {
    this.authService.getUserDetails()
      .then(result => {
        this.user = result;
      }).catch(err => {
        console.log(err)
      })
  }

  changePassword(formInputs) {
    console.log(formInputs)
    console.log(this.user);
    if (formInputs.password == formInputs.password_confirmation) {
      let loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
      loader.present();
      this.passwordService.changePassword(formInputs, this.user.id)
        .then(result => {
          this.showToast('แก้ไขเสร็จสมบูรณ์')
          loader.dismiss();
          this.viewCtrl.dismiss();
        }).catch(err => {
          console.log(err)
          this.showAlert(err.text())
          this.viewCtrl.dismiss();
          loader.dismiss();
        })
    }else{
      this.showAlert('รหัสผ่านไม่ตรงกัน')
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  //Loader
  showLoader() {
    this._loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    this._loader.present()
  }
  //disMiss Loader
  dismissLoader() {
    this._loader.dismiss()
  }
  //Alert
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({ title: textInput })
    this._alert.present()
  }
  //Toast
  showToast(textInput) {
    this._toast = this.toastCtrl.create({ message: textInput, duration: 2000, position: 'top' })
    this._toast.present()
  }

}
