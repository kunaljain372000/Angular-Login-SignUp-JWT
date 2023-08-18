import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  public getEmployee():EmployeeModel[]{
    return[
      {
        "id":1,
        "name":"Abhi", 
        "age": 20, 
        "designation":"Dev" , 
        "address": "121-Hsr,Bangalore",
      },
      {
        "id":2,
        "name":"Bahadur", 
        "age": 21, 
        "designation":"Dev" , 
        "address": "122-Hsr,Bangalore",
      }, {
        "id":3,
        "name":"Chetan", 
        "age": 22, 
        "designation":"Dev" , 
        "address": "123-Hsr,Bangalore",
      },
      {
        "id":4,
        "name":"Dinesh", 
        "age": 23, 
        "designation":"Dev" , 
        "address": "124-Hsr,Bangalore",
      },
      {
        "id":5,
        "name":"EL", 
        "age": 24, 
        "designation":"Dev" , 
        "address": "125-Hsr,Bangalore",
      },
      {
        "id":6,
        "name":"Figaro", 
        "age": 25, 
        "designation":"Dev" , 
        "address": "126-Hsr,Bangalore",
      },
      {
        "id":7,
        "name":"Girish", 
        "age": 26, 
        "designation":"Dev" , 
        "address": "127-Hsr,Bangalore",
      },
      {
        "id":8,
        "name":"Hiresh", 
        "age": 27, 
        "designation":"Dev" , 
        "address": "128-Hsr,Bangalore",
      },
      {
        "id":9,
        "name":"Intkam", 
        "age": 28, 
        "designation":"Dev" , 
        "address": "129-Hsr,Bangalore",
      },
      {
        "id":10,
        "name":"Jummanji", 
        "age": 29, 
        "designation":"Dev" , 
        "address": "130-Hsr,Bangalore",
      },
    ]
  }
}
