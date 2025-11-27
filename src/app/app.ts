import { Component, signal } from '@angular/core';

import { Employee } from './core/models/employee';
import { Enterprise } from './core/models/enterprise';
import { applyEach, email, Field, form, min, minLength, required } from '@angular/forms/signals';


@Component({
  selector: 'app-root',
  imports: [Field],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  enterpriseData = signal<Enterprise>({
    name: '',
    employees: []
  })

  enterpriseForm = form(this.enterpriseData, (schemaPath) => {
    required(schemaPath.name);
    minLength(schemaPath.name, 2);
    applyEach(schemaPath.employees, (employeePath) =>{
      required(employeePath.name);
      minLength(employeePath.name, 2);

      required(employeePath.email);
      minLength(employeePath.email, 2);
      email(employeePath.email);

      required(employeePath.age);
      min(employeePath.age, 18);
    })
  });


  addEmployee(employee?: Employee) {
    this.enterpriseData.update((enterprise) => ({
      ...enterprise,
      employees: [... enterprise.employees, employee ?? { name: '', email: '', age: 0 }]
    }))
  }

  onSubmit() {
    console.log('Form Value')
    console.log(this.enterpriseData());
  }

  onDeleteEmployee(index: number) {
    this.enterpriseData.update((enterprise) => ({
      ...enterprise,
      employees: [ ...enterprise.employees.filter((_,i) => index !== i )]
    }))
  }
}
