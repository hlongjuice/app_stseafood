import { EmployeeService } from './../../../../services/employee.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EmployeeEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-employee-edit',
  templateUrl: 'employee-edit.html',
})
export class EmployeeEditPage {

  name: string;
  lastname: string;
  divisions: any[];
  allDepartments:any[];
  departments: any[];
  salary_type_id: any;
  em_id: string;
  division_id: number;
  department_id: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public employeeService: EmployeeService

  ) {
  }

  ngOnInit() {
    this.em_id = this.navParams.get('em_id');
    this.name = this.navParams.get('name');
    this.lastname = this.navParams.get('lastname');
    this.divisions = this.navParams.get('divisions');
    this.division_id=this.navParams.get('division_id');
    this.department_id=this.navParams.get('department_id');
    this.salary_type_id = this.navParams.get('salary_type_id');
    this.allDepartments=this.navParams.get('departments');
    if(this.division_id){
      this.getDepartment();
    }
  }

  /* Get Department */
  getDepartment(){
    this.departments=this.allDepartments.filter(item=>{
      return item.division_id==this.division_id
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  /*Update Data*/
  update() {
    let employeeInput = {
      'em_id': this.em_id,
      'name': this.name,
      'lastname': this.lastname,
      'division_id': this.division_id,
      'department_id': this.department_id,
      'salary_type_id': this.salary_type_id
    }
    this.employeeService.updateEmployee(employeeInput)
      .then(result => {
        this.viewCtrl.dismiss(result);
      }).catch(err => { console.log(err) })
  }

}
