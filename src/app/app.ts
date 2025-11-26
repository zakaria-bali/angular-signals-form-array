import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from './core/models/employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  enterpriseForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    employees: new FormArray([])
  });

  get employees(): FormArray {
    return this.enterpriseForm.get('employees') as FormArray;
  }

  addEmployee(employee?: Employee) {
    const employeeForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true }),
      email: new FormControl('', { validators: [Validators.required, Validators.minLength(2), Validators.email], nonNullable: true }),
      age: new FormControl(0, { validators: [Validators.required, Validators.min(18), Validators.email], nonNullable: true }),
    })

    if (employee) {
      employeeForm.setValue(employee);
    }

    this.employees.push(employeeForm);
  }
  

  onSubmit() {
    console.log('Form Value')
    console.log(this.enterpriseForm.getRawValue());
  }

  onDeleteEmployee(index: number) {
    this.employees.removeAt(index);
  }
}
