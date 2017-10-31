import { EmployeeService } from './../../../../services/employee.service';
import { DepartmentService } from './../../../../services/department.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopupDivisionDepartmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popup-division-department',
  templateUrl: 'popup-division-department.html',
})
export class PopupDivisionDepartmentPage {

  divisions:any[];
  division_id:number;
  department_id:number;
  allDepartments:any[];
  departments:any[];
  employees:any[];
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public viewCtrl:ViewController,
  public departmentService:DepartmentService,
  public employeeService:EmployeeService) {
  }

  ngOnInit(){
    this.division_id=null;
    this.department_id=null;
    this.divisions=this.navParams.get('divisions');
    this.employees=this.navParams.get('employees');
    this.allDepartments=this.navParams.get('departments');
    console.log(this.employees);
  }

  getDepartment(division_id){
    this.departments=[];
    this.allDepartments.forEach(department=>{
      if(department.division_id==division_id){
        this.departments.push(department);
      }
    })
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  update(){
    console.log(this.division_id,this.department_id,this.employees);
    this.employeeService.changeDivisionDepartment(this.division_id,this.department_id,this.employees)
    .then(result=>{
      this.viewCtrl.dismiss(result);
    }).catch(err=>{
      this.viewCtrl.dismiss(err);
    })
  }

}
