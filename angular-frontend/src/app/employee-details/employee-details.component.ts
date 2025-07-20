import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Department } from '../department';
import { Router } from '@angular/router'; // ← Make sure this is imported

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id: string
  employee: Employee
  departments: Department[] = [];
  selectedEmployees: Employee[] = [];
  selectedDepartmentName: string = '';
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employee = new Employee();
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    });
  }


  updateEmployee(id: string) {
    this.router.navigate(['/update-employee', id]);
  }
  onSelectDepartment(department: Department) {
    this.selectedDepartmentName = department.name;
    this.employeeService.getEmployeesInDepartment(department.id).subscribe(data => {
      this.selectedEmployees = data;
    });
  }


}
