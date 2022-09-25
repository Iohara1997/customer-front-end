import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/SERVICES/customer.service';
import { CepService } from '../../SERVICES/cep.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formCreate: FormGroup;
  @Input() street: boolean = false;

  constructor(private CustomerService: CustomerService,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private CepService: CepService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formCreate = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cep: [, [Validators.required, this.validate_cep]],
      num: ['', [Validators.required]],
      street: ['', [Validators.required]],
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
