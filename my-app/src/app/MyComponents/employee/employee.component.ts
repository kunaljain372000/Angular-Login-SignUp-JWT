import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/MyComponents/services/employee.service';
import { EmployeeModel } from '../models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  // providers:[EmployeeService]
})
export class EmployeeComponent implements OnInit {

  public employee: EmployeeModel[] = [];

  constructor(public employeeService:EmployeeService){
    // var employeeService = new EmployeeService();
    // this.employee=employeeService.getEmployee();
  }

  ngOnInit():void{
    this.employee=this.employeeService.getEmployee();
    console.log(this.employee);
  }
}
