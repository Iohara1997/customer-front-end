import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/SERVICES/customer.service';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUcustomer } from 'src/app/INTERFACES/IUcustomer';
import { CepService } from '../../SERVICES/cep.service'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  customer: IUcustomer;
  formCreate: FormGroup;
  id_customer: string;
  @Input() street: boolean = false;

  constructor(private CustomerService: CustomerService,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private activeRoute: ActivatedRoute, private CepService: CepService) { }

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
      cep: [this.customer.cep, [Validators.required, this.validate_cep]],
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

  generateAddress(value) {
    let cep = String(value).length;
    if (cep == 8) {
      this.getDataCep(value);
    }
    else this.formCreate.get('street').setValue('');
  }

  async getDataCep(cep) {
    (await this.CepService.getDataCep(cep)).subscribe(data => {
      if (data['erro']) return this.street = true;
      this.formCreate.get('street').setValue(data['logradouro']);
      this.street = false;
    })
  }

  validate_cep(control: AbstractControl): { [key: string]: boolean } | null {
    const cep = String(control.value).length;
    if (control.value !== undefined && (isNaN(control.value) || cep != 8)) {
      return { 'cepError': true };
    }
    return null;
  }
}
