import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  [x: string]: any;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  public signUpForm!: FormGroup;
  userServices: any;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@gmail.com')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    }, { validators: this.passwordMatchingValidatior });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      // this.signUpForm.reset();
    } else {
      this.validateAllFormFields(this.signUpForm);
      alert("Invalid Registration!!");
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // signUp() {
  //   this.http.post<any>("http://localhost:3000/signupUsers", this.signUpForm.value)
  //     .subscribe(
  //       (res) => {
  //         alert("Signup Successful");
  //         this.signUpForm.reset();
  //         this.router.navigate(['login']);
  //       },
  //       (err) => {
  //         alert("Signup Failed. Please try again.");
  //       }
  //     );
  // }

  private passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }



  signUp() {
    console.log(this.signUpForm.value);
    this.http.post('http://localhost:8081/auth/create-user',this.signUpForm.value).subscribe((res)=>{
      console.log(res);
      this.signUpForm.reset();
      this.router.navigate(['/login']);
    })
  }
  
    // this.authService.addUser(this.signUpForm.value).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     alert('Success');
    //     this.router.navigate(['login']);

    //   },
    //   (error: any) => {
    //     console.log(error);
    //     alert('Something went wrong');
    //   }
    // );
  }
  
