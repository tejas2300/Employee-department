import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Department } from '../department';
import { Employee } from '../employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  departments: Department[] = [];
  selectedEmployees: Employee[] = [];
  selectedDepartment: Department | null = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.employeeService.getAllDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  onSelectDepartment(department: Department) {
    if (this.selectedDepartment?.id === department.id) {
      // Collapse if already selected
      this.selectedDepartment = null;
      this.selectedEmployees = [];
    } else {
      // Expand and load employees
      this.selectedDepartment = department;
      this.employeeService.getEmployeesInDepartment(department.id).subscribe(data => {
        this.selectedEmployees = data;
      });
    }
  }

  deleteEmployee(empId: string) {
    if (!this.selectedDepartment) return;

    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployeeFromDepartment(this.selectedDepartment.id, empId).subscribe(() => {
        this.selectedEmployees = this.selectedEmployees.filter(emp => emp.id !== empId);
      });
    }
  }
}
