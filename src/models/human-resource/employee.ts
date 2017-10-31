import { salaryTypeModel } from './salary-type';
import { DepartMentModel } from './department';
import { DivisionModel } from './division';
export class EmployeeModel{
    public em_id: string;
    public name: string;
    public lastname: string;
    public division:DivisionModel;
    public department:DepartMentModel
    public salary_type:salaryTypeModel
    public created_by_user_id: number;
    public updated_by_user_id: number;
    public created_at: Date;
    public updated_at: Date;
    constructor() {
    }
}