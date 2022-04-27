import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { Product } from 'src/app/models/product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  public products: Product[];
  public editProduct: Product;
  public deleteProduct: Product;
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  constructor(private productService: ProductService, private employeeService:EmployeeService, public authenticationService:AuthenticationService){}

  ngOnInit() {
    this.getProducts();
    this.getEmployees();
  }

  public getProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProduct(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.productService.addProduct(addForm.value).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchProducts(key: string): void {
    console.log(key);
    const results: Product[] = [];
    for (const product of this.products) {
      if (product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || product.productCode.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(product);
      }
    }
    this.products = results;
    if (results.length === 0 || !key) {
      this.getProducts();
    }
  }

  public onOpenModalForProducts(product: Product, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProductModal');
    }
    if (mode === 'edit') {
      this.editProduct = product;
      button.setAttribute('data-target', '#updateProductModal');
    }
    if (mode === 'delete') {
      this.deleteProduct = product;
      button.setAttribute('data-target', '#deleteProductModal');
    }
    container.appendChild(button);
    button.click();
  }
  
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 
  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
 
  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 
  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.employeeCode.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
 
  public onOpenModalForEmployees(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }


  logOut(){
    this.authenticationService.logOut();
  }
}