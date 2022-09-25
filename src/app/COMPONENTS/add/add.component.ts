import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/SERVICES/customer.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  formCreate: FormGroup;

  constructor(private CustomerService: CustomerService, private router: Router,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formCreate = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      cpf: [''],
      phone: [''],
      cep: [''],
      num: [''],
      street: ['']
    });
  }

  create() {
    if (this.formCreate.invalid) return;
    let customer = this.formCreate.getRawValue()
    this.CustomerService.createCustomer(customer).subscribe(
      res => {
        this.snackBar.open('Usuário adicionado com sucesso!', '', {
          duration: 3000
        });
      },
      err => {
        console.log(err)
        this.snackBar.open('Verifique os dados, e tente novamente.', 'Erro.', {
          duration: 3000
        });
      }
    );
  }
}
