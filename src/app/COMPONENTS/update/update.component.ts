import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/SERVICES/customer.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUcustomer } from 'src/app/INTERFACES/IUcustomer';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  customer: IUcustomer;
  formCreate: FormGroup;
  id_customer: string;

  constructor(private CustomerService: CustomerService,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private activeRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.id_customer = <string>this.activeRoute.snapshot.params.id;
    if (this.id_customer) {
      await (await this.CustomerService.getOneCustomer(this.id_customer)).toPromise().then((res) => {
        this.customer = res as IUcustomer;
      })
    }
    this.createForm();
  }

  createForm() {
    this.formCreate = this.formBuilder.group({
      email: [this.customer.email, [Validators.required, Validators.email]],
      name: [this.customer.name, [Validators.required]],
      cpf: [this.customer.cpf, [Validators.required]],
      phone: [this.customer.phone, [Validators.required]],
      cep: [this.customer.cep, [Validators.required]],
      street: [this.customer.address.split(",", 2)[0], [Validators.required]],
      num: [this.customer.address.split(",", 2)[1], [Validators.required]],
    });
  }

  update() {
    if (this.formCreate.invalid) return;
    let customer = this.formCreate.getRawValue()
    this.CustomerService.updateCustomer(this.id_customer, customer).subscribe(
      res => {
        this.snackBar.open('Usuário atualizado com sucesso!', '', {
          duration: 3000
        });
      },
      err => {
        console.log(err)
        this.snackBar.open('Erro interno do servidor, tente novamente.', 'Erro.', {
          duration: 3000
        });
      }
    );
  }

}
