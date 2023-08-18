import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import baseUrl from './helper';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'my_user_token';

  constructor(private http: HttpClient, private router: Router) {}

  public addUser(user:any)
  {
  return this.http.post(`${baseUrl}/auth/create-user`,user);
  }

  // login(data: any) {
  //   return this.http.post<any>('http://localhost:8081/auth/login',data);
    
  //  }

    //     if (user) {
    //       const myToken = "my user token";
    //       localStorage.setItem(this.tokenKey, myToken);
    //       alert('Login Success!!');
    //       console.log(myToken);
    //       this.router.navigateByUrl('/employee');
    //     } else {
    //       alert('User not found');
    //     }
    //   },
    //   (err) => {
    //     console.error('Something went wrong', err);
    //     alert('Something went wrong');
    //   }
    // );
  //}

  login(data: any) {
    return this.http.post<any>('http://localhost:8081/auth/login', data)
      .pipe(
        tap((response: any) => {
          const jwtToken = response?.jwtToken;
          if (jwtToken) {
            localStorage.setItem(this.tokenKey, jwtToken);
            alert('Login Success!!');
            this.router.navigateByUrl('/employee');
          } else {
            alert('User not found');
          }
        }),
        catchError((error) => {
          console.error('Something went wrong', error);
          alert('Something went wrong');
          throw error; 
        })
      );
  }
  

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']); 
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
