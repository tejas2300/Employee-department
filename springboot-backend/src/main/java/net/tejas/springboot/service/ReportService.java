// src/main/java/net/javaguides/springboot/service/ReportService.java
package net.tejas.springboot.service;

import net.tejas.springboot.dto.DepartmentEmployeeReportDTO;
import net.tejas.springboot.model.Department;
import net.tejas.springboot.model.Employee;
import net.tejas.springboot.repository.DepartmentRepository;
import net.tejas.springboot.repository.EmployeeRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;

@Service
public class ReportService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public byte[] generateDepartmentEmployeeReport() throws Exception {
        List<Department> departments = departmentRepository.findAll();
        List<DepartmentEmployeeReportDTO> reportList = new ArrayList<>();

        for (Department dept : departments) {
            List<Employee> employees = employeeRepository.findByDepartmentId(dept.getId());
            for (Employee emp : employees) {
                DepartmentEmployeeReportDTO dto = new DepartmentEmployeeReportDTO();
                dto.setDepartmentName(dept.getName());
                dto.setEmployeeName(emp.getName());
                dto.setEmailId(emp.getEmailId());
                dto.setPosition(emp.getPosition());
                reportList.add(dto);
            }
        }

        InputStream reportStream = getClass().getResourceAsStream("/department_employees.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(reportList);
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, new HashMap<>(), dataSource);

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}
