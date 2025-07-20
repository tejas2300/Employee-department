import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Department } from '../department';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  departments: Department[] = [];
  formSubmitted: boolean = false; // for validation highlight

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.employeeService.getAllDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  saveEmployee() {
    if (!this.employee.departmentId) {
      console.error('Department ID is required');
      return;
    }

    this.employeeService
      .addEmployeeToDepartment(this.employee.departmentId, this.employee)
      .subscribe({
        next: () => {
          this.goToEmployeeList();
        },
        error: error => console.error('Error saving employee:', error)
      });
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit(form: any) {
    this.formSubmitted = true;
    if (form.valid) {
      this.saveEmployee();
    } else {
      console.warn('Form is invalid');
    }
  }
}
