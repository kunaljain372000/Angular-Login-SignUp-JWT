// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { MycomponentsComponent } from './mycomponents/mycomponents.component';
import { LoginComponent } from './mycomponents/login/login.component';
import { SignupComponent } from './mycomponents/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './shared/http-interceptor';
import { EmployeeComponent } from './mycomponents/employee/employee.component';


@NgModule({
  declarations: [
    AppComponent,
    MycomponentsComponent,
    LoginComponent,
    SignupComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
