import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: string;
  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    }, error => console.log(error));
  }

  onSubmit() {

    if (this.employee.salary > 2147483647) {
      alert("Salary too high");

    } else {
      this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
        this.goToEmployeeList();
      }, error => console.log(error));

    }
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

}
