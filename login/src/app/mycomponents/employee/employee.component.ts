import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmployeeModel } from './employee model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private authService: AuthService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });

    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });

    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res: any) => {
        console.log(res);
        alert("Employee Added Successfully");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (err: any) => {
        console.error(err);
        alert("Failed to add employee. Please try again later.");
      }
    );
  }

  kindlyLogout() {
    this.authService.logout();
    alert('Logout successful');
    this.route.navigate(['/login']);
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(
      (res: any) => {
        console.log(res);
        this.employeeData = res;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  deleteEmployee(row: any) {
    this.employeeModelObj.id = row.id;

    this.api.deleteEmployee(this.employeeModelObj.id).subscribe(
      (res: any) => {
        alert("Employee Deleted");
        this.getAllEmployee();
      },
      (err: any) => {
        console.error(err);
        alert("Failed to delete employee. Please try again later.");
      }
    );
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, 1).subscribe(
      (res: any) => {
        alert("Updated Successfully!!");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (err: any) => {
        console.error(err);
        alert("Failed to update employee. Please try again later.");
      }
    );
  }

  formlog() {
    if (this.formValue.valid) {
      console.log(this.formValue.value);
    } else {
      alert("Invalid Registration!!");
    }
  }
}
