import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/api/v1/employees";
  private baseURL2 = "http://localhost:8080/api/v1/departments";


  constructor(private httpClient: HttpClient) { }
  //Employee-------------
  getEmployeesList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  createEmployee(employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: string, employee: Employee): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }


  //Department----------

  getAllDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(`${this.baseURL2}`);
  }

  getEmployeesInDepartment(deptId: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL2}/${deptId}/employees`);
  }

  addEmployeeToDepartment(deptId: string, employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.baseURL2}/${deptId}/employees`, employee);
  }

  deleteEmployeeFromDepartment(deptId: string, empId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL2}/${deptId}/employees/${empId}`);
  }

}
