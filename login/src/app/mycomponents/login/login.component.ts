import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public isSubmitting = false;
  public passwordVisible = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      const loginData = this.loginForm.value;
      this.auth.login(loginData);
    } else {
      this.validateAllFormField(this.loginForm);
      alert("Invalid login!!");
    }
  }
  userlogin() {
    this.auth.login(this.loginForm.value).subscribe((res)=>{
      console.log(res);
    }),
    this.router.navigate(['/employee']);
  }

  private validateAllFormField(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormField(control);
      } else {
        control?.markAsDirty();
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
