package net.tejas.springboot.controller;

import net.tejas.springboot.exception.ResourceNotFoundException;
import net.tejas.springboot.model.Department;
import net.tejas.springboot.model.Employee;
import net.tejas.springboot.repository.DepartmentRepository;
import net.tejas.springboot.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/departments")
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @GetMapping("/{deptId}/employees")
    public ResponseEntity<List<Employee>> getEmployeesByDepartment(@PathVariable String deptId) {
        departmentRepository.findById(deptId).orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + deptId));
        List<Employee> employees = employeeRepository.findByDepartmentId(deptId);
        return ResponseEntity.ok(employees);
    }

    @PostMapping("/{deptId}/employees")
    public ResponseEntity<Employee> addEmployeeToDepartment(
            @PathVariable String deptId,
            @RequestBody Employee employee) {
        Department department = departmentRepository.findById(deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + deptId));
        employee.setDepartment(department);
        return ResponseEntity.ok(employeeRepository.save(employee));
    }


    @DeleteMapping("/{deptId}/employees/{empId}")
    public ResponseEntity<Void> deleteEmployeeFromDepartment(
            @PathVariable String deptId,
            @PathVariable String empId) {
        Employee employee = employeeRepository.findById(empId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + empId));
        if (!employee.getDepartment().getId().equals(deptId)) {
            throw new ResourceNotFoundException("Employee not in department with id: " + deptId);
        }
        employeeRepository.delete(employee);
        return ResponseEntity.noContent().build();
    }
}
