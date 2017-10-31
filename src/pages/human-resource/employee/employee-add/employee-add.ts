import { EmployeeService } from './../../../../services/employee.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';

/**
 * Generated class for the EmployeeAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-employee-add',
  templateUrl: 'employee-add.html',
})
export class EmployeeAddPage {

  divisions: any[];
  allDepartments: any[];
  departments: any[];
  ranks: any[];
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loaderCtrl: LoadingController,
    public employeeService: EmployeeService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
    this.divisions = this.navParams.data.divisions
    this.allDepartments = this.navParams.data.departments
    this.ranks = this.navParams.data.ranks
    this.user = this.navParams.data.user;
  }

  /* Get Departments */
  getDepartments(division_id) {
    this.departments = this.allDepartments.filter(item => {
      return item.division_id = division_id
    })
  }
  /* Dismiss */
  dismiss() {
    this.viewCtrl.dismiss()
  }
  /* Add New Employee */
  addNewEmployee(formInputs) {
    let loader = this.loaderCtrl.create({ content: 'กำลังเพิ่มข้อมูล...' })
    let toast = this.toastCtrl.create({ message: 'เพิ่มข้อมูลสำเร็จ', duration: 2000 })
    loader.present();
    this.employeeService.addNewEmployee(formInputs.em_id, formInputs.name, formInputs.lastname
      , formInputs.division_id, formInputs.department_id, formInputs.salary_type_id, formInputs.rank_id
      , this.user.id
    ).then(result => {
      loader.dismiss()
      this.viewCtrl.dismiss(result)
      toast.present();
    }).catch(err => {
      console.log(err);
      this.viewCtrl.dismiss();
      let alert = this.alertCtrl.create({ title: err.em_id+': ไม่สามารถเพิ่มข้อมูลได้ ' })
      alert.present();
      loader.dismiss()
    })
  }
}
