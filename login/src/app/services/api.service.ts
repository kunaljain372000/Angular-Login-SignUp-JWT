import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private authToken: string | null = null;

  constructor(private http: HttpClient) { }

  setAuthorizationHeader(token: string) {
    this.authToken = token;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
     if (this.authToken) {
       headers = headers.append('Authorization', `Bearer ${this.authToken}`);
    }

    return headers;
  }

  postEmployee(data: any) {
    const headers = this.getHeaders();
    return this.http.post<any>("http://localhost:3000/posts", data, { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getEmployee() {
    const headers = this.getHeaders();
    return this.http.get<any>("http://localhost:3000/posts", { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateEmployee(data: any, id: number) {
    const headers = this.getHeaders();
    return this.http.put<any>("http://localhost:3000/posts/" + id, data, { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  deleteEmployee(id: number) {
    const headers = this.getHeaders();
    return this.http.delete<any>("http://localhost:3000/posts/" + id, { headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  
}
